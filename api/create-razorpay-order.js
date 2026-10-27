export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecret = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!keyId || !keySecret || !supabaseUrl || !supabaseSecret) {
      return res.status(500).json({
        error: "Server configuration is missing.",
      });
    }

    const { orderId } = req.body || {};

    if (
      typeof orderId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        orderId
      )
    ) {
      return res.status(400).json({ error: "A valid order ID is required." });
    }

    // Fetch the order and its trusted amount from Supabase.
    const orderResponse = await fetch(
      `${supabaseUrl}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}&select=id,total_paise,payment_status,payment_reference&limit=1`,
      {
        headers: {
          apikey: supabaseSecret,
          Authorization: `Bearer ${supabaseSecret}`,
        },
      }
    );

    if (!orderResponse.ok) {
      console.error("Could not retrieve the Shopora order.");
      return res.status(502).json({ error: "Unable to retrieve your order." });
    }

    const orders = await orderResponse.json();
    const order = orders[0];

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    if (order.payment_status !== "pending" || order.payment_reference) {
      return res.status(409).json({
        error: "This order cannot start another payment.",
      });
    }

    const amountPaise = Number(order.total_paise);

    // Allow amounts up to â‚¹20,000,000, subject to Razorpay's own limits.
    if (
      !Number.isSafeInteger(amountPaise) ||
      amountPaise < 100 ||
      amountPaise > 2000000000
    ) {
      return res.status(400).json({ error: "Invalid order amount." });
    }

    // Create a Razorpay order using the database amount.
    const paymentResponse = await fetch(
      "https://api.razorpay.com/v1/orders",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountPaise,
          currency: "INR",
          receipt: `shopora_${order.id}`,
        }),
      }
    );

    const paymentOrder = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error(
        "Razorpay order creation failed:",
        paymentOrder.error?.code
      );
      return res.status(502).json({
        error: "Unable to start payment. Please try again.",
      });
    }

    // Link the Razorpay order to the Shopora order.
    const updateResponse = await fetch(
      `${supabaseUrl}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}&payment_status=eq.pending&payment_reference=is.null`,
      {
        method: "PATCH",
        headers: {
          apikey: supabaseSecret,
          Authorization: `Bearer ${supabaseSecret}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          payment_reference: paymentOrder.id,
        }),
      }
    );

    const updatedOrders = updateResponse.ok
      ? await updateResponse.json()
      : [];

    if (!updateResponse.ok || updatedOrders.length !== 1) {
      console.error("Could not link the payment to the Shopora order.");
      return res.status(409).json({
        error: "Unable to link payment to your order. Please contact support.",
      });
    }

    return res.status(200).json({
      id: paymentOrder.id,
      amount: paymentOrder.amount,
      currency: paymentOrder.currency,
      keyId,
    });
  } catch (error) {
    console.error("Payment setup error:", error.message);
    return res.status(500).json({
      error: "Unable to start payment. Please try again.",
    });
  }
}

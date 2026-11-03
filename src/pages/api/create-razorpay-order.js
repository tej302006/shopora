
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecret = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Check server configuration.
    if (!keyId || !keySecret || !supabaseUrl || !supabaseSecret) {
      console.error("Payment server configuration is missing.");

      return res.status(500).json({
        error: "Server configuration is missing.",
      });
    }

    // Validate the Shopora order ID.
    const { orderId } = req.body || {};

    if (
      typeof orderId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        orderId
      )
    ) {
      return res.status(400).json({
        error: "A valid order ID is required.",
      });
    }

    // Retrieve the order from Supabase.
    const orderResponse = await fetch(
      `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/orders?id=eq.${encodeURIComponent(
        orderId
      )}&select=id,total_paise,payment_status,payment_reference&limit=1`,
      {
        headers: {
          apikey: supabaseSecret,
          Authorization: `Bearer ${supabaseSecret}`,
        },
      }
    );

    // Log the actual Supabase error.
    if (!orderResponse.ok) {
      const details = await orderResponse.text();

      console.error("Supabase order lookup failed:", {
        status: orderResponse.status,
        details,
      });

      return res.status(502).json({
        error: "Unable to retrieve your order.",
      });
    }

    const orders = await orderResponse.json();
    const order = orders[0];

    if (!order) {
      return res.status(404).json({
        error: "Order not found.",
      });
    }

    // Check payment status.
    if (
      order.payment_status !== "pending" ||
      order.payment_reference
    ) {
      return res.status(409).json({
        error: "This order cannot start another payment.",
      });
    }

    // Validate the order amount.
    const amountPaise = Number(order.total_paise);

    if (
      !Number.isSafeInteger(amountPaise) ||
      amountPaise < 100 ||
      amountPaise > 2000000000
    ) {
      return res.status(400).json({
        error: "Invalid order amount.",
      });
    }

    // Create a Razorpay order.
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
      console.error("Razorpay order creation failed:", {
        status: paymentResponse.status,
        code: paymentOrder.error?.code,
        description: paymentOrder.error?.description,
      });

      return res.status(502).json({
        error: "Unable to start payment. Please try again.",
      });
    }

    // Link Razorpay order to the Shopora order.
    const updateResponse = await fetch(
      `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/orders?id=eq.${encodeURIComponent(
        orderId
      )}&payment_status=eq.pending&payment_reference=is.null`,
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
      const details = updateResponse.ok
        ? "No matching order was updated."
        : await updateResponse.text();

      console.error("Could not link Razorpay payment:", {
        status: updateResponse.status,
        details,
      });

      return res.status(409).json({
        error: "Unable to link payment to your order. Please contact support.",
      });
    }

    // Return Razorpay checkout details.
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

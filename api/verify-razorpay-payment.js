import crypto from "node:crypto";

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
        error: "Payment verification is not configured.",
      });
    }

    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body || {};

    if (
      typeof orderId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        orderId
      ) ||
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string" ||
      !/^[a-f0-9]{64}$/i.test(razorpay_signature)
    ) {
      return res.status(400).json({ error: "Invalid payment details." });
    }

    // Verify the Razorpay signature.
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest();

    const receivedSignature = Buffer.from(razorpay_signature, "hex");

    if (
      expectedSignature.length !== receivedSignature.length ||
      !crypto.timingSafeEqual(expectedSignature, receivedSignature)
    ) {
      return res.status(400).json({
        verified: false,
        error: "Payment signature verification failed.",
      });
    }

    // Retrieve the Shopora order from Supabase.
    const databaseOrderResponse = await fetch(
      `${supabaseUrl}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}&select=id,total_paise,payment_status,payment_reference&limit=1`,
      {
        headers: {
          apikey: supabaseSecret,
          Authorization: `Bearer ${supabaseSecret}`,
        },
      }
    );

    if (!databaseOrderResponse.ok) {
      return res.status(502).json({
        error: "Unable to check your order.",
      });
    }

    const databaseOrders = await databaseOrderResponse.json();
    const databaseOrder = databaseOrders[0];

    if (!databaseOrder) {
      return res.status(404).json({ error: "Shopora order not found." });
    }

    if (
      databaseOrder.payment_status !== "pending" ||
      databaseOrder.payment_reference !== razorpay_order_id
    ) {
      return res.status(409).json({
        verified: false,
        error: "This order cannot be verified for this payment.",
      });
    }

    // Confirm payment details directly with Razorpay.
    const paymentResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(
        razorpay_payment_id
      )}`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
        },
      }
    );

    if (!paymentResponse.ok) {
      return res.status(502).json({
        error: "Unable to confirm payment status.",
      });
    }

    const payment = await paymentResponse.json();

    if (
      payment.order_id !== razorpay_order_id ||
      Number(payment.amount) !== Number(databaseOrder.total_paise) ||
      payment.currency !== "INR" ||
      payment.status !== "captured"
    ) {
      return res.status(400).json({
        verified: false,
        error: "Payment is not confirmed as captured.",
      });
    }

    // Mark the order as paid only when it is still pending.
    const updateResponse = await fetch(
      `${supabaseUrl}/rest/v1/orders?id=eq.${encodeURIComponent(
        orderId
      )}&payment_status=eq.pending&payment_reference=eq.${encodeURIComponent(
        razorpay_order_id
      )}`,
      {
        method: "PATCH",
        headers: {
          apikey: supabaseSecret,
          Authorization: `Bearer ${supabaseSecret}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          payment_status: "paid",
          payment_reference: razorpay_payment_id,
          order_status: "confirmed",
        }),
      }
    );

    if (!updateResponse.ok) {
      console.error("Failed to update the paid Shopora order.");
      return res.status(502).json({
        verified: false,
        error:
          "Payment may have succeeded, but the order update failed. Please contact support.",
      });
    }

    const updatedOrders = await updateResponse.json();

    if (updatedOrders.length !== 1) {
      return res.status(409).json({
        verified: false,
        error: "The order was already updated or could not be updated.",
      });
    }

    return res.status(200).json({
      verified: true,
      orderId,
      razorpay_payment_id,
    });
  } catch (error) {
    console.error("Payment verification error:", error.message);

    return res.status(500).json({
      error: "Unable to verify payment.",
    });
  }
}

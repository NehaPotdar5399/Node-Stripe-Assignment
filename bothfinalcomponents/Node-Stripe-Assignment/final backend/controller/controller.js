require("dotenv").config();
const stripe = require("stripe")(process.env.stripe_key);
const mongoose = require("mongoose");
const stripePaymentModel = require("../models/payment");
const productdetails = require("../models/productdetails");
const savePaymentDetails = async (paymentDetails) => {
  try {
    const paymentDetail = await stripePaymentModel.create({
      customer_id: paymentDetails.customer,
      customer_name: paymentDetails.customer_details.name,
      email: paymentDetails.customer_details.email,
      payment_intent: paymentDetails.payment_intent,
      payment_method_type: paymentDetails.payment_method_types[0],
      curreny: paymentDetails.currency,
      amount: paymentDetails.amount_total,
      payment_status: paymentDetails.status,
    });
    await paymentDetail.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createPayment(req, res) {
    const paymentDetails = new payment({
      customer_id: mongoose.Types.ObjectId(),
      customer_name: payment.customer_name,
      email: payment.email,
      payment_intent: payment.payment_intent,
      payment_method_type: payment.payment_method_type,
      currency: payment.currency,
      amount: payment.amount,
      payment_status: payment.payment_status,
    });
    return payment
      .save()
      .then((newPayment) => {
        return res.status(201).json({
          success: true,
          message: "New payment created successfully",
          payment: newPayment,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: error.message,
        });
      });
  },
  getProduct: async (req, res, next) => {
    try {
      const products = await productdetails.find({});
      if (products) {
        res.status(200).send(products);
      } else {
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  stripeCheckout: async (req, res, next) => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: req.body.product_details.product_name || "Apple Airpods",
                images:
                  [req.body.product_details.images[0]] ||
                  "https://m.media-amazon.com/images/I/615ekapl+pL._SL1500_.jpg",
              },
              unit_amount: req.body.product_details.price * 100 || 299 * 100,
            },
            quantity: req.body.quantity,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:4200/success",
        cancel_url: "http://localhost:4200/",
      });
      res.send(session.url);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  stripePayment: (request, response) => {
    try {
      let eventType = request.body.type;
      if (eventType === "checkout.session.completed") {
        let paymentDetails = request.body.data.object;
        savePaymentDetails(paymentDetails);
      }
      response.send().end();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};

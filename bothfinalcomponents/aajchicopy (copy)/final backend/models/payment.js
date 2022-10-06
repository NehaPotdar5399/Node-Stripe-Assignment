const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let payment = new Schema({
  customer_id: String,
  customer_name: String,
  email: String,
  payment_intent: String,
  payment_method_type: String,
  currency: String,
  amount: Number,
  payment_status: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("payments", payment);

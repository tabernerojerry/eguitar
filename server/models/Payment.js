const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user: {
    type: Array,
    default: []
  },
  data: {
    type: Array,
    default: []
  },
  product: {
    type: Array,
    default: []
  }
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;

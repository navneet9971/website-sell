const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'SellData' },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  razorpayOrderId: {type: String, required: true},
  razorpayPaymentId: { type: String, required: true },
  razorpaySignature: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Success', 'Failed'], default: 'Pending' },
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', purchaseSchema);

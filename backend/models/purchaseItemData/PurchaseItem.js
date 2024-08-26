const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SellData' 
  },
  productIds: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SellData' 
  }],
  products: [{ 
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'SellData' 
    },
    projectCode: { type: String },
    livePreview: { type: String },
    installationGuide: { type: String },
    price: { 
      type: Number, 
      required: true 
    },
    img: [{ type: String }], // Ensure this is an array of strings
    title: [{ type: String }] // Ensure this is an array of strings
  }],
  img: [{ 
    type: String
  }],
  price: { 
    type: Number, 
    required: true 
  },
  title: [{ 
    type: String
  }],
  razorpayOrderId: { 
    type: String, 
    required: true 
  },
  razorpayPaymentId: { 
    type: String, 
    required: true 
  },
  razorpaySignature: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Success', 'Failed'], 
    default: 'Pending' 
  },
  purchaseDate: { 
    type: Date, 
    default: Date.now 
  }
});

purchaseSchema.index({ userId: 1 });
purchaseSchema.index({ productId: 1 });
purchaseSchema.index({ productIds: 1 });

module.exports = mongoose.model('Purchase', purchaseSchema);

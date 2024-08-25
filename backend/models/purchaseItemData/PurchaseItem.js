const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  productId: { // Single product ID field
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SellData' 
  },
  productIds: [{ // Array of product IDs field
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
  }],
  img: [{ // Main images field as an array of strings
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

// Adding indexes for performance
purchaseSchema.index({ userId: 1 });
purchaseSchema.index({ productId: 1 });
purchaseSchema.index({ productIds: 1 }); // Index for array field

module.exports = mongoose.model('Purchase', purchaseSchema);

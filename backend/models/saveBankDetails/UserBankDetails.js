const mongoose = require('mongoose');

const bankDetailsSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    bankName: { 
        type: String, 
        required: true 
    },
    branchName: { 
        type: String, 
        required: true 
    },
    accountNumber: { 
      type: String, 
      required: true, 
      unique: true
  },
    accountName: { 
        type: String, 
        required: true 
    },
    ifscCode: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String 
    },
    district: { 
        type: String 
    },
    state: { 
        type: String 
    },
    address: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('BankDetails', bankDetailsSchema);

const mongoose = require('mongoose');

const bankDetailsSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
      },
    bankName: { type: String },
    bankBranch: { type: String },
    accountNumber: { type: String },
    accountName: { type: String },
    ifscCode: { type: String },
    accountType: { type: String },
    userUpi_id: { type: String},
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('BankDetails', bankDetailsSchema);
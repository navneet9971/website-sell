const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'auths', 
        required: true 
      },
    product_id: {type: String},
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('UserReview', ReviewSchema);
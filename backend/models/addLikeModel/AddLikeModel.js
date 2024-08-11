const mongoose = require('mongoose');

const addLikeSchema = new mongoose.Schema({
    user_id: { type: String },
    product_id: { type: String },
    projectImages: {type:String, defult:''},
    productTitle: {type: String},
    codeDescription: {type: String},
    price: {type: String},
    likeStatus: { type: Boolean, default: '' },
})

module.exports = mongoose.model('AddLike', addLikeSchema);
const mongoose = require('mongoose');

const addCartSchema = new mongoose.Schema({
    product_id: { type: String },
    // quantity: { type: Number },
    user_id: { type: String },
    price: {type: String},
    industry: { type: [String] },
    productTitle: {type: String},
    projectImages: { type: [String], defult: []},
}) 

module.exports = mongoose.model('AddCart', addCartSchema);
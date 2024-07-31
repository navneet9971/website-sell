
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the schema for SellData
const sellDataSchema = new Schema ({
    productTitle: {
        type: String,
        required: true
    },
    codeDescription: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    programmingLanguage: {
        type: String,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    installationInstructions: {
        type: String,
        required: true
    },
    adaptationInstructions: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    devices: {
        type: [String],
        required: true
    },
    livePreview: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    projectImages: {
        type: [String],
        required: true
    },
    installationGuide: {
        type: String,
        required: true
    },
    projectCode: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Create and export the model
const SellDataModel = model('SellData', sellDataSchema);

module.exports = SellDataModel;
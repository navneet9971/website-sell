const mongoose = require('mongoose');

const sellDataSchema = new mongoose.Schema({
  productTitle: { type: String },
  codeDescription: { type: String },
  tags: { type: [String] },
  programmingLanguage: { type: [String] },
  features: { type: [String] },
  installationInstructions: { type: String },
  adaptationInstructions: { type: String },
  industry: { type: [String] },
  devices: { type: [String] },
  appUse: { type: [String] },
  livePreview: { type: String },
  videoUrl: { type: String },
  projectImages: { type: [String], default: [] },
  price: { type: Number },
  installationGuide: { type: String },
  chooseUpload: { type: String },
  offerOptionBook: { type: String },
  weeklyFreeCode: { type: String },
  currentDate: { type: String },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  userData: { 
    fullName: { type: String }, 
    userName: { type: String }, 
    email: { type: String },
    image: { type: String }
  }
});

module.exports = mongoose.model('SellData', sellDataSchema);

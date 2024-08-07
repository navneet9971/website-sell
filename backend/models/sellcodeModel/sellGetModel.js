const mongoose = require('mongoose');

const sellDataSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  codeDescription: { type: String, required: true },
  tags: { type: [String], required: true },
  programmingLanguage: { type: [String], required: true },
  features: { type: [String], required: true },
  installationInstructions: { type: String },
  adaptationInstructions: { type: String },
  industry: { type: [String], required: true },
  devices: { type: [String], required: true },
  livePreview: { type: String },
  videoUrl: { type: String },
  projectImages: { type: String },
  price: { type: Number, required: true },
  installationGuide: { type: String },
  chooseUpload: {type: String, required: true},
  externalSource: {type: String, required: true},
  copyrightTransfer: {type: String, required: true},
  productQualityGuideLine: {type: String, required: true},
  holdCopyright: { type: String, required: true},
  offerOptionBook: { type: String},
  weeklyFreeCode: { type: String},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
});

module.exports = mongoose.model('SellData', sellDataSchema);

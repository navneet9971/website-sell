const mongoose = require('mongoose');

const sellDataSchema = new mongoose.Schema({
  productTitle: { type: String, required: true },
  codeDescription: { type: String, required: true },
  tags: { type: [String], required: true },
  programmingLanguage: { type: [String], required: true },
  features: { type: [String], required: true },
  installationInstructions: { type: String },
  adaptationInstructions: { type: String},
  industry: { type: [String], required: true },
  devices: { type: [String], required: true },
  livePreview: { type: String },
  videoUrl: { type: String },
  projectImages: { type: String },
  price: { type: Number, required: true },
  installationGuide: { type: String },
  chooseUpload: {type: String, require:true},

  externalSource : {type: String, require: true},
  copyrightTransfer: {type: String, require:true},
  productQulityGuideLine: {type: String, require: true},
  holdcopyRight: { type: String, require: true},
  offerOptionBook: { type: String},
  weeklyFreeCode: { type: String}
});

module.exports = mongoose.model('SellData', sellDataSchema);

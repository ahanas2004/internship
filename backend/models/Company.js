const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String },
  location: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
  name: {type: String, required: true},
  startedDate: {type: Date, required: true},
  endedDate: {type: Date, required: true},
  technical: {type: String, required: true},
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoansSchema = new Schema({
  bankId: {
    type: Schema.Types.ObjectId
  },
  init_loan: {
    type: String,
    required: true
  },
  down_payment:{
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('loans', LoansSchema);

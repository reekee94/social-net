const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  bank_name: {
    type: String,
    required:true
    },
  website: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  loan_term: {
    type: String,
    required: true
  },
  interest_rate: {
    type: [String],
    required: true
  },
  max_loan: {
    type: String,
    required: true
  },
  min_down_payment: {
    type: String,
    required: true
  },
  mortgages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'loans'
  }],
  //   {
  //     title: {
  //       type: String,
  //       required: true
  //     },
  //     company: {
  //       type: String,
  //       required: true
  //     },
  //     location: {
  //       type: String
  //     },
  //     from: {
  //       type: Date,
  //       required: true
  //     },
  //     to: {
  //       type: Date
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false
  //     },
  //     description: {
  //       type: String
  //     }
  //   }
  // ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('bank', BankSchema);

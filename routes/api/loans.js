const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Loan = require('../../models/Loans');
const User = require('../../models/User');
const Bank = require('../../models/Bank');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/loans
// @desc     Create a loan
// @access   Private
router.post(
  '/',
  auth,
  check('init_loan', 'Text is required').not().isEmpty(),
  check('down_payment', 'Text is required').not().isEmpty(),
  check('month', 'Text is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      bankId,
      init_loan,
      down_payment,
      month,
      ...rest
    } = req.body;
    const loanFields = {
      bankId,
      init_loan,
      down_payment,
      month: Array.isArray(month)
        ? month
        : month.split(',').map((m) => ' ' + m.trim()),
      ...rest
    };

    try {

      const newLoan = new Loan({
         init_loan,
         down_payment,
         month,
          bankId
       });

      const loan = await newLoan.save();

      res.json(loan);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/loans
// @desc     Get all loans
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const loans = await Loan.find({}).sort({ date: -1 });
    res.json(loans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/loans/:id
// @desc     Get loan by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ msg: 'Loan not found' });
    }

    res.json(loan);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/loans/:id
// @desc     Delete a loan
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ msg: 'Loan not found' });
    }

    // Check user
    if (loan.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await loan.remove();

    res.json({ msg: 'Loan removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Bank = require('../../models/Bank');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  auth,
  check('bank_name', 'Bank name is required').notEmpty(),
  check('loan_term', 'Loan term is required').notEmpty(),
   check('interest_rate', 'Interest rate is required').notEmpty(),
   check('max_loan', 'Maximum loan is required').notEmpty(),
   check('min_down_payment', 'Minimum down payment is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newBank = new Bank({
        loan_term: req.body.loan_term,
        interest_rate: req.body.interest_rate,
        max_loan: req.body.max_loan,
        min_down_payment: req.body.min_down_payment,
        bank_name: req.body.bank_name,
        avatar: req.body.avatar,
        user: req.user.id
      });

      const bank = await newBank.save();

      res.json(bank);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/banks
// @desc     Get all banks

// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const banks = await Bank.find().sort({ date: -1 });
    res.json(banks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/bank/:id
// @desc     Get bank by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.id);

    if (!bank) {
      return res.status(404).json({ msg: 'Bank not found' });
    }
    console.log(bank);
    res.json(bank);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/bank/:id
// @desc     Delete a bank
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.id);

    if (!bank) {
      return res.status(404).json({ msg: 'Bank not found' });
    }

    // Check user
    if (bank.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await bank.remove();

    res.json({ msg: 'Bank removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }})
//
// // @route    POST api/banks/loans/:id
// // @desc     Loan from a bank
// // @access   Private
// router.post(
//   '/loan/:id',
//   auth,
//   checkObjectId('id'),
//   check('text', 'Text is required').notEmpty(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//
//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       const post = await Bank.findById(req.params.id);
//
//       const newComment = {
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id
//       };
//
//       post.comments.unshift(newComment);
//
//       await post.save();
//
//       res.json(post.comments);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );
//
// // @route    DELETE api/posts/comment/:id/:comment_id
// // @desc     Delete comment
// // @access   Private
// router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
//   try {
//     const post = await Bank.findById(req.params.id);
//
//     // Pull out comment
//     const comment = post.comments.find(
//       (comment) => comment.id === req.params.comment_id
//     );
//     // Make sure comment exists
//     if (!comment) {
//       return res.status(404).json({ msg: 'Comment does not exist' });
//     }
//     // Check user
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }
//
//     post.comments = post.comments.filter(
//       ({ id }) => id !== req.params.comment_id
//     );
//
//     await post.save();
//
//     return res.json(post.comments);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).send('Server Error');
//   }
// });

module.exports = router;




// const express = require('express');
// co
// const config = require('config');
// const router = express.Router();
// const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator');
// // bring in normalize to give us a proper url, regardless of what user entered
// const normalize = require('normalize-url');
// const checkObjectId = require('../../middleware/checkObjectId');
//
// const Bank = require('../../models/Bank');
// const User = require('../../models/User');
// const Loan = require('../../models/Loans');
//
// // @route    GET api/bank/me
// // @desc     Get current users bank
// // @access   Private
// router.get('/me', auth, async (req, res) => {
//   try {
//     const bank = await Bank.findOne({
//       user: req.user.id
//     }).populate('user', ['name', 'avatar']);
//
//     if (!bank) {
//       return res.status(400).json({ msg: 'There is no bank for this user' });
//     }
//
//     res.json(bank);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
// // @route    POST api/bank
// // @desc     Create or update user bank
// // @access   Private
// router.post(
//   '/',
//   auth,
//   check('loan_term', 'Loan term is required').notEmpty(),
//   check('interest_rate', 'Interest rate is required').notEmpty(),
//   check('max_loan', 'Maximum loan is required').notEmpty(),
//   check('min_down_payment', 'Minimum down payment is required').notEmpty(),
//   async (req, res) => {
//     console.log('HERE');
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//
//     // destructure the request
//     const {
//       website,
//       // spread the rest of the fields we don't need to check
//       ...rest
//     } = req.body;
//
//     // build a bank
//     const bankFields = {
//       user: req.user.id,
//       website:
//         website && website !== ''
//           ? normalize(website, { forceHttps: true })
//           : '',
//       // skills: Array.isArray(skills)
//       //   ? skills
//       //   : skills.split(',').map((skill) => ' ' + skill.trim()),
//       ...rest
//     };
//
//     try {
//       // Using upsert option (creates new doc if no match is found):
//       let bank = await Bank.findOneAndUpdate(
//         { user: req.user.id },
//         { $set: bankFields },
//         { new: true, upsert: true, setDefaultsOnInsert: true }
//       );
//       return res.json(bank);
//     } catch (err) {
//       console.error(err.message);
//       return res.status(500).send('Server Error');
//     }
//   }
// );
//
// // @route    GET api/bank
// // @desc     Get all banks
// // @access   Public
// router.get('/', async (req, res) => {
//   try {
//     const banks = await Bank.find().populate('user', ['name', 'avatar']);
//     res.json(banks);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
// // @route    GET api/bank/user/:user_id
// // @desc     Get bank by user ID
// // @access   Public
// // router.get(
// //   '/user/:user_id',
// //   checkObjectId('user_id'),
// //   async ({ params: { user_id } }, res) => {
// //     try {
// //       const bank = await Bank.findOne({
// //         user: user_id
// //       }).populate('user', ['name', 'avatar']);
// //
// //       if (!bank) return res.status(400).json({ msg: 'Bank not found' });
// //
// //       return res.json(bank);
// //     } catch (err) {
// //       console.error(err.message);
// //       return res.status(500).json({ msg: 'Server error' });
// //     }
// //   }
// // );
//
// // @route    DELETE api/bank
// // @desc     Delete bank, user & posts
// // @access   Private
// router.delete('/', auth, async (req, res) => {
//   try {
//     // Remove user loans
//     // Remove bank
//     // Remove user
//     await Promise.all([
//       Loan.deleteMany({ user: req.user.id }),
//       Bank.findOneAndRemove({ user: req.user.id }),
//       User.findOneAndRemove({ _id: req.user.id })
//     ]);
//
//     res.json({ msg: 'User deleted' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });
//
// // @route    PUT api/bank/experience
// // @desc     Add bank experience
// // @access   Private
// // router.put(
// //   '/experience',
// //   auth,
// //   check('title', 'Title is required').notEmpty(),
// //   check('company', 'Company is required').notEmpty(),
// //   check('from', 'From date is required and needs to be from the past')
// //     .notEmpty()
// //     .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
// //   async (req, res) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       return res.status(400).json({ errors: errors.array() });
// //     }
// //
// //     try {
// //       const bank = await Bank.findOne({ user: req.user.id });
// //
// //       bank.experience.unshift(req.body);
// //
// //       await bank.save();
// //
// //       res.json(bank);
// //     } catch (err) {
// //       console.error(err.message);
// //       res.status(500).send('Server Error');
// //     }
// //   }
// // );
//
// // @route    DELETE api/bank/experience/:exp_id
// // @desc     Delete experience from bank
// // @access   Private
//
// router.delete('/experience/:exp_id', auth, async (req, res) => {
//   try {
//     const foundbank = await Bank.findOne({ user: req.user.id });
//
//     foundbank.experience = foundbank.experience.filter(
//       (exp) => exp._id.toString() !== req.params.exp_id
//     );
//
//     await foundbank.save();
//     return res.status(200).json(foundbank);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// });
//
// // @route    PUT api/bank/education
// // @desc     Add bank education
// // @access   Private
// router.put(
//   '/education',
//   auth,
//   check('school', 'School is required').notEmpty(),
//   check('degree', 'Degree is required').notEmpty(),
//   check('fieldofstudy', 'Field of study is required').notEmpty(),
//   check('from', 'From date is required and needs to be from the past')
//     .notEmpty()
//     .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//
//     try {
//       const bank = await Bank.findOne({ user: req.user.id });
//
//       bank.education.unshift(req.body);
//
//       await bank.save();
//
//       res.json(bank);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );
//
//
// module.exports = router;

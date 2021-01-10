const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js')

const User = require('../../models/User')


router.get('/', auth, (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (e) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router

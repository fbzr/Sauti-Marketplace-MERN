const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET api/users/
// @desc    Get all users
// @access  Public
router.get('/', auth, (req, res) => {
    User.find({}, (err, users) => {
        if(!err) {
            return res.status(200).json(users);
        }
    })
});

module.exports = router;
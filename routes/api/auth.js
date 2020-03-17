const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require('../../models/User');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if(await User.findOne({ username })) {
            return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
        }

        const user = new User({
            username,
            password
        })

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.save();
        
        // 200 response
        res.json(user);
    } catch(err) {
        res.status(500).send(`Server error: ${err.message}`);
    }
});

module.exports = router;
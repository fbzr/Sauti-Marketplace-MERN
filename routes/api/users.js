const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
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

        await user.save();
    } catch(err) {
        res.status(500).send(`Server error: ${err.message}`);
    }
});

module.exports = router;
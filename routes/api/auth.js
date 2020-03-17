const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// @route   POST api/auth/login
// @desc    User log in - Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}] });
        }

        const userExists = await bcrypt.compare(password, user.password);

        if (!userExists) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}] });
        }

        // Set jwt payload
        const jwtPayload = {
            user: {
                id: user.id
            }
        };

        // Get JWT
        jwt.sign(
            jwtPayload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 }, // 1 hour 3600 seconds
            (err, token) => {
                if (err) throw err;

                // 200 response
                res.json({ 
                    token,
                    user_id: user.id
                });
            }
        );
    } catch(err) {
        res.status(500).send(`Server error: ${err.message}`);
    }
});

module.exports = router;
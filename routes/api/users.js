const express = require('express');
const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', async (req, res) => {
    const { username, password } = req.body;
});

module.exports = router;
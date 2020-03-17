const express = require('express');
const router = express.Router();
const Listing = require('../../models/Listing');

router.get('/', (req, res) => {
    Listing.find({}, (err, listings) => {
        if(!err) {
            return res.status(200).json(listings);
        }
    })
});

module.exports = router;
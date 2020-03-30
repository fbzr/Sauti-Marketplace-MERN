const express = require('express');
const router = express.Router();
const Listing = require('../../models/Listing');
const auth = require('../../middleware/auth');
const mongoose = require("mongoose");

// @route   GET api/listings/
// @desc    Get all listings
// @access  Private
router.get('/', auth, (req, res) => {
    Listing.find({}, (err, listings) => {
        if(!err) {
            return res.status(200).json(listings);
        }
    })
});

// @route   POST api/listings/
// @desc    Add listing
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const {
            item,
            description,
            location,
            price
        } = req.body;


        // req.user -> From auth middleware
        const user = await User.findById(req.user.id).select('-password');

        const listing = new Listing({
            item,
            description,
            location,
            price,
            user: {
                id: user.id,
                username: user.username
            }
        })

        listing.save();

        // 200 response
        res.json(listing);
    } catch(err) {
        res.status(500).send(`Server error: ${err.message}`);
    }
});

// @route   DELETE /api/listings/:id
// @desc    Remove listing
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        Listing.findById(req.params.id, async (err, listing) => {
            if(err) {
                return res.status(500).send('Server error');
            }

            if (!listing || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(404).send('Listing not found');
            }
    
            if (listing.user.id.toString() !== req.user.id.toString()) {
                return res.status(500).send('User does not have credentials');
            }
    
            await listing.remove();
            res.status(200).send('Listing removed');
        });
    } catch(err) {
        res.status(500).send(`Server error: ${err.message}`);
    }
});

// @route   PUT /api/listings/:id
// @desc    Edit listing
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        Listing.findById(req.params.id, (err, listing) => {
            if(err) {
                return res.status(500).send('Server error');
            }

            if (!listing || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(404).send('Listing not found');
            }
    
            if (listing.user.id.toString() !== req.user.id.toString()) {
                return res.status(500).send('User does not have credentials');
            }

            const {
                item,
                description,
                location,
                price
            } = req.body;

            
            listing.item = item;
            listing.description = description;
            listing.location = location;
            listing.price = price;
            listing.save();

            res.json(listing);
        });
    } catch(err) {
        res.status(500).send(`Server error: ${err.message}`);
    }
})

module.exports = router;
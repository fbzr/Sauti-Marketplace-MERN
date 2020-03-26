const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Price = require('../../models/Price');
const mongoose = require('mongoose');

// @route   GET api/prices/
// @desc    Get all prices
// @access  Private
router.get('/', auth, async (req, res) => {
    Price.find({}, (err, prices) => {
        if(err) {
           return res.status(500).json({message: err.message});
        }
        return res.status(200).json(prices);
    });
});

// @route   POST api/prices/
// @desc    Add a new price
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const {
            product,
            product_cat,
            sub_category,
            avg_price
        } = req.body;

        const price = new Price({
            product,
            product_cat,
            sub_category,
            avg_price
        });

        price.save();

        // 200 response
        res.json(price);
    } catch(err) {
        res.status(500).send(`Server error: ${err.message}`);
    }
})

// @route   DELETE api/prices/delete/:id
// @desc    Delete price
// @access  Private
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const price = Price.findById(req.params.id);
        
        // check for price and ObjectId format
        if( !price || !req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
            return res.status(404).send(`Price not found`);
        }

        await price.remove();

        res.status(200).send('Price removed');
    } catch(err) {
        res.status(500).send(`Server error: ${err.message}`);
    }
});

// @route   PUT api/prices/:id
// @desc    Edit price
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        debugger
        const {
            product,
            product_cat,
            sub_category,
            avg_price
        } = req.body;
        

        Price.findByIdAndUpdate(
            {_id: req.params.id },
            { $set: {
                product,
                product_cat,
                sub_category,
                avg_price
            }},
            { new: true },
            (err, updatedPrice) => {
                if(err) {
                    return res.status(500).send('Error updating price');
                }
                res.status(200).json(updatedPrice);
            }
        );
    } catch(err) {
        res.status(500).send(`Server error: ${err.message}`);
    }
});

module.exports = router;
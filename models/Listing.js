const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        username: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    }
});

module.exports = Listing = mongoose.model('listing', ListingSchema);
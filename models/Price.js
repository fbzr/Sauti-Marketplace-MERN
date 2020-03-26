const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
    product_cat: {
        type: String,
        required: true
    },
    sub_category: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    avg_price: {
        type: Number,
        required: true
    }
});

module.exports = Price = mongoose.model('price', PriceSchema);
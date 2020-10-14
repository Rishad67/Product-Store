const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    brand: String,
    details: String,
    image: String,
    price: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Product',productSchema,'Product');
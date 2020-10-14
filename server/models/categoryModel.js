const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: String,
    numberOfProducts: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Category',categorySchema,'Category');
// Mongoose is scheme based solution to model data
// Schema creates key-value pairs for data types
// Mongoose creates an object reference --> Database gets modelled within code

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);     //exporting model
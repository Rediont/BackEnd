const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 20
    },
    address: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 30
    },
})

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;

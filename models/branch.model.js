const mongoose = require('mongoose');

const companyBranchSchema = new mongoose.Schema({
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
    employees: [{
        type: Number,
        ref: 'Emloyee'
    }]
})

const Branch = mongoose.model('Branch', companyBranchSchema);
module.exports = Branch;

const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    emloyee: {
        type: Number,
        ref: 'Employee'
    },
    client: {
        type: Number,
        ref: 'Client'
    },
    insuranceType: {
        type: Number,
        ref: 'Insurance'
    },
    insuranceAmount: {
        type: Number,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
        max: 1000
    }
})

const Contract = mongoose.model('Contract', contractSchema);
module.exports = Contract;
const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    insuranceType: {
        type: mongoose.Schema.Types.ObjectId,
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
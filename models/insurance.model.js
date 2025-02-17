const mongoose = require('mongoose');
const AutoIncrement =  require('mongoose-sequence')(mongoose);

const insuranceTypeSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    wageRate: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    }
})

insuranceTypeSchema.plugin(AutoIncrement,{inc_field: 'id'});

const Insurance = mongoose.model('Insurance', insuranceTypeSchema);
module.exports = Insurance;



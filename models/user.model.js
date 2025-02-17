const mongoose = require('mongoose');
const AutoIncrement =  require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    privileges: {
        type: String,
        enum: ['admin', 'standard'],
        required: true,
        default: 'standard'
    },
    employeeId: {
        type: Number,
        ref: 'Employee'
    }
});

userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', userSchema);
module.exports = User;


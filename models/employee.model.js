const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: false,
        minlength: 1,
        maxlength: 20
    },
    surname:{
        type: String,
        required: true,
        unique: false,
        minlength: 1,
        maxlength: 20
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\+?[0-9]{10,15}$/.test(v); // Дозволяє + на початку та 10-15 цифр
            },
            message: props => `${props.value} не є коректним номером телефону!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 15,
        maxlength: 40
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyBranch'
    }
})

const Employee =  mongoose.model('Employee', employeeSchema);
module.exports = Employee;


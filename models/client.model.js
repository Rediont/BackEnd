const mongoose = require('mongoose');
const AutoIncrement =  require('mongoose-sequence')(mongoose);

const clientSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15,
        unique: false
    },
    surname: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15,
        unique: false
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
    address: {
        type: String,
        required: true,
        unique: false
    }
})

clientSchema.plugin(AutoIncrement,{inc_field: 'id'});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;



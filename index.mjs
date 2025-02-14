import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence'

const dbUrl = 'mongodb+srv://mykhailovuilov:RpoeelGukiwcihTl@clustertm16.exaxa.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTM16'

await mongoose.connect(dbUrl);

const dbClient = mongoose.connection;

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
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
    previleges: {
        type: String,
        enum: ['admin','standart'],
        required: true,
        default: 'standart'
    },
    employeeId: {
        type: Number,
        ref: 'Employee' 
    }
})

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
    }],

})

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
        type: Number,
        ref: 'CompanyBranch'
    },
    contracts: [{
        type: Number,
        ref: 'Contract'
    }]
})



userSchema.plugin(AutoIncrement,{inc_field: 'id'});
clientSchema.plugin(AutoIncrement,{inc_field: 'id'});
companyBranchSchema.plugin(AutoIncrement,{inc_field: 'id'});
employeeSchema.plugin(AutoIncrement,{inc_field: 'id'});

const User = mongoose.model('User', userSchema);

module.exports = mongoose

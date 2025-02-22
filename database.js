const mongoose = require('mongoose');
const Insurance = require('./models/insurance.model')
const Branch = require('./models/branch.model')
const Employee = require('./models/employee.model')

const dbUrl = 'mongodb+srv://mykhailovuilov:RpoeelGukiwcihTl@clustertm16.exaxa.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTM16'

mongoose.connect(dbUrl);

const dbClient = mongoose.connection;

const connectDb = () => {
    try {
        mongoose.connect(dbUrl);
        console.log("DB connected!")
    }
    catch {
        console.error('error db connection')
    }
}

// function create(){
//     const newEmployee = Employee({
//         id: 2,
//         name: "John",
//         surname: "Wick",
//         phoneNumber: "+1234267811",
//         email: "superemail@email.com",
//         branch: "67b867f5e029d809c48d9fc8"
//     })
//     newEmployee.save();
// }

// create();

module.exports = connectDb;

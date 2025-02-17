const mongoose = require('mongoose');

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

module.exports = connectDb;

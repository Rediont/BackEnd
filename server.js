const express = require('express');
const mongoose = require('mongoose')
const clientsRouter = require('./routes/clients');
const loginRouter = require('./routes/login');
const contractsRouter = require('./routes/contracts');
const employeeRouter = require('./routes/employee');
const salaryRouter = require('./routes/salary');
const connectDb = require('./database');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/clients', clientsRouter);
app.use('/login', loginRouter);
app.use('/contracts', contractsRouter);
app.use('/employee', employeeRouter);
app.use('/salary',salaryRouter);

app.get('/', (req,res) => {
    connectDb();
    res.send("Connected!");
})

app.listen(PORT,() => {
    console.log(`server running on port: ${PORT}`)
})
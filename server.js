const express = require('express');
const clientsRouter = require('./routes/clients');
const loginRouter = require('./routes/login')
const contractsRouter = require('./routes/contracts')

const app = express();

const PORT = 3000;

app.use(express.json())
app.use('/clients', clientsRouter)
app.use('/login', loginRouter)
app.use('/contracts', contractsRouter)

app.get('/', (req,res) => {
    res.send("Connected!");
})

app.listen(PORT,() => {
    
})
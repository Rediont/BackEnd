const express = require('express');
const Client = require('../models/client.model');

const router = express.Router();

router.get('/', (req,res) => {



})

router.get('/:id', async (req,res) => {
    try {
        const client = Client.findOne({id: req.params.id});
        res.json(client);
    }   
    catch {
        res.status(404);
    }
})

router.post('/create', async (req, res) => {
    try {
        const newId = await Client.countDocuments() + 1;

        const newClient = Client({
            id: newId,
            name: req.body.name,
            surname: req.body.surname,
            phoneNumber: req.body.phone,
            address: req.body.address
        })

        res.send('created');
    }
    catch {
        res.status(500);
    }
})

router.put('/:id', async (req, res) => {
    try {
        switch (true) {
            case req.query.name: {
                await Client.findOneAndUpdate({id: req.params.id},
                    { $set: {name: req.query.name} }
                )
            }
            case req.query.surname: {
                await Client.findOneAndUpdate({id: req.params.id},
                    { $set: {surname: req.query.surname} }
                )
            }
            case req.query.phone: {
                await Client.findOneAndUpdate({id: req.params.id},
                    { $set: {phoneNumber: req.query.phone} }
                )
            }
            case req.query.address: {
                await Client.findOneAndUpdate({id: req.params.id},
                    { $set: {name: req.query.address} }
                )
            }
        }
        res.send('client updated');
    }
    catch {
        res.status(500);   
    }
})

router.delete('/:id', async (req,res) => {
    try {
        let targetId = Number(req.params.id);
        await Client.findOneAndDelete({id: targetIdid});
        res.send(`client with id: ${targetId}`);
    }
    catch {
        res.status(500);
    }
})

module.exports = router;
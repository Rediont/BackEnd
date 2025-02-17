const express = require('express');
const Client = require('../models/client.model');

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    }
    catch {
        res.status(404);
    }
})

router.get('/:id', async (req,res) => {
    try {
        const client = await Client.findOne({id: req.params.id});
        res.json(client);
    }   
    catch {
        res.status(404);
    }
})

router.post('/', async (req, res) => {
    try {
        const newId = await Client.countDocuments() + 1;

        const newClient = Client({
            id: newId,
            name: req.body.name,
            surname: req.body.surname,
            phoneNumber: req.body.phone,
            address: req.body.address
        })
        await newClient.save();
        res.send('created');
    }
    catch {
        res.status(500);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updateFields = {};

        if (req.query.name) updateFields.name = req.query.name;
        if (req.query.surname) updateFields.surname = req.query.surname;
        if (req.query.phone) updateFields.phoneNumber = req.query.phone;
        if (req.query.address) updateFields.address = req.query.address;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send("No fields to update.");
        }

        await Client.findOneAndUpdate({ id: req.params.id }, { $set: updateFields });

        res.send("Client updated successfully.");
    } catch (error) {
        res.status(500).send("Server error.");
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
const express = require('express');
const mongoose = require('mongoose');
const Contract = require('../models/contract.model')


const router = express.Router();
router.use(express.json());

router.get('/', (req,res) => {
    res.send('contracts good');
})

router.get('/:id', async (req,res) => {
    try {
        const contract = await Contract.collection.find({id: req.params.id});
        console.log('found');
        res.json(contract);
    }
    catch {
        res.status(500);
    }
})

 router.post('/create', async (req,res) => {
    try {
        const id = await Contract.collection.countDocuments() + 1;
        const newContract = Contract({
            id: id,
            employye: req.body.employeeId,
            client: req.body.clientId,
            insuranceType: req.body.insuranceTypeId,
            insuranceAmount: req.body.insuranceAmount,
            date: new Date(),
            duration: req.body.duration
        })

        await newContract.save();
        res.status(201)
        res.send(`created ${id}`);
    }
    catch{
        res.status(500)
    }
})

module.exports = router;
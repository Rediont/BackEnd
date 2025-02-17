const express = require('express');
const mongoose = require('mongoose');
const Contract = require('../models/contract.model');
const Client = require('../models/client.model');


const router = express.Router();
router.use(express.json());

router.get('/show/:pageid', async (req,res) => {
    try {
        let limit = 5;
        let page = Number(req.params.pageid);
        let skip = (page-1) * limit;

        const contracts = await Contract.find().skip(skip).limit(limit).populate('client').populate('employee');

        console.log(contracts);
        res.json(contracts);
    }
    catch {
        res.status(500);
    }
})

router.get('/:id', async (req,res) => {
    try {
        const contract = await Contract.collection.find({id: req.params.id});
        console.log('found');
        res.json(contract);
    }
    catch {
        res.status(404);
    }
})

 router.post('/create', async (req,res) => {
    try {

        // if(Client.find({id: req.body.clientId})){

        // }

        const id = await Contract.countDocuments() + 1;
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
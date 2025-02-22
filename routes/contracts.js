const express = require('express');
const Branch = require('../models/branch.model')
const Contract = require('../models/contract.model');
const Client = require('../models/client.model');
const Employee = require('../models/employee.model');
const Insurance = require('../models/insurance.model');
const { model } = require('mongoose');


const router = express.Router();
router.use(express.json());

router.get('/show/:pageid', async (req,res) => {
    try {
        let limit = 5;
        let page = Number(req.params.pageid);
        let skip = (page-1) * limit;

        const contracts = await Contract.find().skip(skip)
            .limit(limit)
            .populate('client')
            .populate({
                path: 'employee',
                populate: {
                    path: 'branch',
                    model: 'Branch'
                }
            })
            .populate('insuranceType')
            .lean();

        console.log(contracts);
        res.json(contracts);
    }
    catch(error) {
        console.error("Error fetching contracts:", error);
        res.status(500).json({ error: "Internal Server Error" });
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
        const client = await Client.findOne({
            name: req.body.clientName,
            surname: req.body.clientSurname,
            address: req.body.clientAddress
        });

        const targetEmployee = await Employee.findOne({
            id: req.body.employeeId
        });

        const insuranceType = await Insurance.findOne({
            id: req.body.insuranceTypeId
        });

        employeeObjectId = targetEmployee._id;
        insuranceObjectId = insuranceType._id;

        if(client === null) {
            const clientiId = await Client.countDocuments() + 1;
            const newClient = Client({
                id: clientiId,
                name: req.body.clientName,
                surname: req.body.clientSurname,
                phoneNumber: req.body.clientPhone,
                address: req.body.clientAddress
            });
            clientObjectId = newClient._id;
            await newClient.save();
        }
        else {
            clientObjectId = client._id;
        }

        const id = await Contract.countDocuments() + 1;
        const newContract = Contract({
            id: id,
            employee: employeeObjectId,
            client: clientObjectId,
            insuranceType: insuranceObjectId,
            insuranceAmount: req.body.insuranceAmount,
            date: new Date(),
            duration: req.body.duration
        })

        await newContract.save();
        res.status(201)
        res.send(`created ${id}`);
    }
    catch(error) {
        console.error("Error fetching contracts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
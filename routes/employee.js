const express = require('express');
const mongoose = require('mongoose');
const Employee = require('../models/employee.model')

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    }
    catch {
        res.status(404);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({ id: req.params.id});
        res.json(employee);
    }
    catch {
        res.status(404);
    }
})

module.exports = router;
const express = require('express');
const Employee = require('../models/employee.model');
const Contract = require('../models/contract.model');

const router = express.Router();

router.get('/:id', async (req,res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        let salary = 0;

        const employeeContracts = await Contract.find({
            employee: req.params.id,
            date: {
                $gte: startOfMonth,
                $lt: endOfMonth
            }
        }).populate('insuranceType', 'wageRate');
        for(let contract of employeeContracts){
            salary += contract.insuranceAmount* contract.insuranceType.wageRate;
        }
        res.json({
            EmployeeId: req.params.id,
            salary: salary
        })
    }
    catch {
        res.status(500);
    }
})

module.exports = router;
const express = require('express');
const Employee = require('../models/employee.model');
const Contract = require('../models/contract.model');

const router = express.Router();

router.get('/:id', async (req,res) => {
    try {
        const employee = await Employee.findOne({id: req.params.id});
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        let salary = 0;

        console.log("Received request for employee ID:", req.params.id);
        console.log("Filtering contracts between:", startOfMonth, "and", endOfMonth);
        const employeeContracts = await Contract.find({
            employee: employee._id,
            date: {
                $gte: startOfMonth,
                $lt: endOfMonth
            }
        }).populate('insuranceType', 'wageRate');

        console.log("Found contracts:", employeeContracts.length);

        for(let contract of employeeContracts){
            console.log(`Processing contract ${contract.id}, wageRate: ${contract.insuranceType?.wageRate}`);
            salary += contract.insuranceAmount * contract.insuranceType.wageRate;
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
const express = require('express');
const mongoose = require('mongoose');
const Employee = require('../models/employee.model')
const Branch = require('../models/branch.model')

const router = express.Router();
router.use(express.json());

router.get('/:pageid', async (req, res) => {
    try {
        let limit = 8;
        let page = Number(req.params.pageid);
        let skip = (page-1) * limit;

        const employees = await Employee.find()
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'branch',
                model: 'Branch' 
            })
            .lean();
        
        res.json(employees);
    }
    catch(error) {
        console.error("Error fetching contracts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
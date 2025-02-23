const express = require('express');
const Insurance = require('../models/insurance.model');

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const insurances = await Insurance.find({});
        res.json(insurances);
    }
    catch {
        res.status(404);
    }
})

module.exports = router;
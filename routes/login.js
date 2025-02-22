const express = require('express');
const User = require('../models/user.model')

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const user = await User.findOne({username: req.query.username, password: req.query.password});
        if(user){
            res.json({
                id: user.employeeId,
                privileges: user.privileges
            });
        }
        else {
            res.json({
                message: 'Acces denied!'
            });
        }
    }
    catch {
        res.status(500);
    }
})

module.exports = router;
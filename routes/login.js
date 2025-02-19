const express = require('express');
const User = require('../models/user.model')

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const user = await User.find({username: req.body.username, password: req.body.password}).lean();
        if(user){
            res.json({
                id: user.employyeId,
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
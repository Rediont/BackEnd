const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('contracts good');
})

router.get('/:id/', (req,res) => {
    console.log(req.params.id)
    res.send('contract good');
})

router.post('/create', (req,res) => {
    
})

module.exports = router;
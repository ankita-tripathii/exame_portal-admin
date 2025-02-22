const accountDetailModel = require('../models/account');
const verify = require('./accountVarify');

const router = require('express').Router();

router.get('/allaccounts', verify, async (req, res) => {
    try{
        const results = await accountDetailModel.find().exec();
       res.send(results);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});


module.exports = router;

const express = require('express');



const {signUP} = require("../services/account");
const {logIN} = require("../services/account");



const router = express.Router()



router.post('/signup', signUP);
router.post('/login', logIN);


module.exports = router;
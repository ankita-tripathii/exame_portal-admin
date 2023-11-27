const express = require('express');



const { signUP } = require("../services/admin");



const router = express.Router()



router.post('/signup', signUP);



module.exports = router;
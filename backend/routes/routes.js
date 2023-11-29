const express = require('express');



const {signUP} = require("../services/account");
const {logIN} = require("../services/account");

const {createassessment} = require('../services/assessment');
const {updatedassessment} = require('../services/assessment');

const {createassessmentevent} = require('../services/assessment_events');

const {createcandidate} = require('../services/candidate');

const {createorganisation} = require('../services/organisation')

const{createeventcandidate} = require('../services/event_candidate')

const router = express.Router()



router.post('/signup', signUP);
router.post('/login', logIN);

router.post('/createassessment', createassessment);
router.put('/updatedassessment', updatedassessment);

router.post('/createassessmentevent', createassessmentevent);

router.post('/createcandidate', createcandidate);

router.post('/createorganisation', createorganisation);

router.post('/createeventcandidate', createeventcandidate);

module.exports = router;
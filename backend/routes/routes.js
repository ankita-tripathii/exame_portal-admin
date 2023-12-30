const express = require('express');
const adminApprovedMiddleware = require('./accountvarify');


const {signUP} = require("../services/account");
const {logIN} = require("../services/account");

const {allassessment} = require('../services/assessment');
const {createassessment} = require('../services/assessment');
const {updateassessment} = require('../services/assessment');
const {allassessment_title} = require('../services/assessment');



const {allevent} = require('../services/assessment_events');
const {createassessmentevent} = require('../services/assessment_events');
const {updateassessmentevent} = require('../services/assessment_events');



const {allcandidate} = require('../services/candidate');
const {createcandidate} = require('../services/candidate');
const {updatecandidate} = require('../services/candidate');


const {allorganisation} = require('../services/organisation');
const {createorganisation} = require('../services/organisation');
const {updateorganisation} = require('../services/organisation');


const {createeventcandidate} = require('../services/event_candidate');
const{geteventcandidate} = require('../services/event_candidate');

const router = express.Router()



router.post('/signup', signUP);
router.post('/login', logIN);

router.post('/allassessment', adminApprovedMiddleware, allassessment);
router.post('/createassessment', adminApprovedMiddleware, createassessment);
router.put('/updateassessment/:assessment_id', adminApprovedMiddleware, updateassessment);
router.get('/allassessment_title', allassessment_title);



router.post('/allevent', allevent);
router.post('/createassessmentevent', adminApprovedMiddleware, createassessmentevent);
router.put('/updateassessmentevent/:assessmentevent_id', adminApprovedMiddleware, updateassessmentevent);


router.post('/allcandidate', allcandidate);
router.post('/createcandidate', adminApprovedMiddleware, createcandidate);
router.put('/updatecandidate/:candidate_id', adminApprovedMiddleware, updatecandidate);


router.post('/allorganisation', allorganisation);
router.post('/createorganisation', adminApprovedMiddleware, createorganisation);
router.put('/updateorganisation/:org_id', adminApprovedMiddleware, updateorganisation);


router.post('/createeventcandidate', adminApprovedMiddleware, createeventcandidate);
router.get('/geteventcandidate/:id', geteventcandidate);

module.exports = router;
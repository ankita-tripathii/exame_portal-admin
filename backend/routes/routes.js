const express = require('express');
const adminApprovedMiddleware = require('./accountvarify');


const {signUP} = require("../services/account");
const {logIN} = require("../services/account");

const {allassessment} = require('../services/assessment');
const {createassessment} = require('../services/assessment');
const {updatedassessment} = require('../services/assessment');



const {allevent} = require('../services/assessment_events');
const {createassessmentevent} = require('../services/assessment_events');
const {updateassessmentevent} = require('../services/assessment_events');
const {searchassessmentevent} = require('../services/assessment_events');


const {allcandidate} = require('../services/candidate');
const {createcandidate} = require('../services/candidate');
const {updatecandidate} = require('../services/candidate');
const {searchcandidate} = require('../services/candidate');


const {allorganisation} = require('../services/organisation');
const {createorganisation} = require('../services/organisation');
const {updateorganisation} = require('../services/organisation');
const {allorg_name} = require('../services/organisation');


const {createeventcandidate} = require('../services/event_candidate');
const{geteventcandidate} = require('../services/event_candidate');

const router = express.Router()



router.post('/signup', signUP);
router.post('/login', logIN);

router.post('/allassessment', allassessment);
router.post('/createassessment', adminApprovedMiddleware, createassessment);
//router.put('/updatedassessment/:assessment_id', adminApprovedMiddleware, updatedassessment);



router.post('/allevent', allevent);
router.post('/createassessmentevent', adminApprovedMiddleware, createassessmentevent);
//router.put('/updateassessmentevent', adminApprovedMiddleware, updateassessmentevent);
router.post('/searchassessmentevent', searchassessmentevent);


router.get('/allcandidate', allcandidate);
router.post('/createcandidate', adminApprovedMiddleware, createcandidate);
//router.put('/updatecandidate', adminApprovedMiddleware, updatecandidate);
router.post('/searchcandidate', searchcandidate);


router.post('/allorganisation', allorganisation);
router.post('/createorganisation', adminApprovedMiddleware, createorganisation);
router.put('/updateorganisation/:org_id', adminApprovedMiddleware, updateorganisation);
router.get('/allorg_name', allorg_name);


router.post('/createeventcandidate', adminApprovedMiddleware, createeventcandidate);
router.get('/geteventcandidate/:id', geteventcandidate);

module.exports = router;
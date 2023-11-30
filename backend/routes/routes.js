const express = require('express');



const {signUP} = require("../services/account");
const {logIN} = require("../services/account");

const {allassessment} = require('../services/assessment');
const {createassessment} = require('../services/assessment');
const {updatedassessment} = require('../services/assessment');
const {searchtitleANDorgname} = require('../services/assessment');


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
const {searchorgname} = require('../services/organisation');

const {createeventcandidate} = require('../services/event_candidate');
const{geteventcandidate} = require('../services/event_candidate');

const router = express.Router()



router.post('/signup', signUP);
router.post('/login', logIN);

router.get('/allassessment', allassessment);
router.post('/createassessment', createassessment);
//router.put('/updatedassessment', updatedassessment);
router.post('/searchtitleANDorgname', searchtitleANDorgname);


router.get('/allevent', allevent);
router.post('/createassessmentevent', createassessmentevent);
//router.put('/updateassessmentevent', updateassessmentevent);
router.post('/searchassessmentevent', searchassessmentevent);


router.get('/allcandidate', allcandidate);
router.post('/createcandidate', createcandidate);
//router.put('/updatecandidate', updatecandidate);
router.post('/searchcandidate', searchcandidate);


router.get('/allorganisation', allorganisation);
router.post('/createorganisation', createorganisation);
//router.put('/updateorganisation', updateorganisation);
router.post('/searchorgname', searchorgname);

router.post('/createeventcandidate', createeventcandidate);
router.get('/geteventcandidate/:id', geteventcandidate);

module.exports = router;
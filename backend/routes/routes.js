const express = require('express');
const adminApprovedMiddleware = require('./accountvarify');

// Multer library for handling file upload stream, multi part.
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const uploadfile = upload.array("files");

//--------------------------------------------------------------------------------------------


const {signUP} = require("../services/account");
const {logIN} = require("../services/account");
const {updateAccount} = require("../services/account");
const {getUserById} = require("../services/account");

const { updateFiles } = require("../services/updateFiles");
const { csvUpload } = require("../services/CSVUpload");


const {allassessment} = require('../services/assessment');
const {createassessment} = require('../services/assessment');
const {updateassessment} = require('../services/assessment');




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


const router = express.Router()



router.post('/signup', signUP);
router.post('/login', logIN);
router.put('/updateAccount/:userId', adminApprovedMiddleware, updateAccount);
router.get('/getUserById/:userId', adminApprovedMiddleware, getUserById)

router.post('/updateFiles', adminApprovedMiddleware, uploadfile, updateFiles);
router.get('/csvUpload', adminApprovedMiddleware, csvUpload);


router.post('/allassessment', adminApprovedMiddleware, allassessment);
router.post('/createassessment', adminApprovedMiddleware, createassessment);
router.put('/updateassessment/:assessment_id', adminApprovedMiddleware, updateassessment);




router.post('/allevent', adminApprovedMiddleware, allevent);
router.post('/createassessmentevent', adminApprovedMiddleware, createassessmentevent);
router.put('/updateassessmentevent/:assessmentevent_id', adminApprovedMiddleware, updateassessmentevent);


router.post('/allcandidate', adminApprovedMiddleware, allcandidate);
router.post('/createcandidate', adminApprovedMiddleware, createcandidate);
router.put('/updatecandidate/:candidate_id', adminApprovedMiddleware, updatecandidate);


router.post('/allorganisation', adminApprovedMiddleware, allorganisation);
router.post('/createorganisation', adminApprovedMiddleware, createorganisation);
router.put('/updateorganisation/:org_id', adminApprovedMiddleware, updateorganisation);


router.post('/createeventcandidate', adminApprovedMiddleware, createeventcandidate);


module.exports = router;
const express = require('express');
const adminApprovedMiddleware = require('../routes/accountvarify');
const eventcandidateDetailModel = require('../models/event_candidate');
const assessmenteventDetailModel = require('../models/assessment_events');
const candidateDetailModel = require('../models/candidate');
const assessmentDetailModel = require('../models/assessment');

var mongoose = require('mongoose');




const createeventcandidate = (async (req, res) => {

     try{
        await adminApprovedMiddleware(req, res, async () => {
            const {
        candidate,
        assessmentTitle
    } = req.body;

        const existingcandidate = await candidateDetailModel.findOne({"user_name": candidate});

            if (!existingcandidate) {
            return res.status(404).json({ message: 'candidate not found' });
        }


        const existingAssessment = await assessmentDetailModel.findOne({ "title": assessmentTitle});

            if (!existingAssessment) {
                return res.status(404).json({ message: 'Title not found' });
            }

    
        // Fetch the corresponding assessmentevents based on the assessment ID
            const existingAssessmentEvent = await assessmenteventDetailModel.findOne({
                "assessment_id": existingAssessment._id
            });

            if (!existingAssessmentEvent) {
                return res.status(404).json({ message: 'NO any event for this assessment title please select other assessment title' });
            }

     const newcandidateevent = new eventcandidateDetailModel({
       candidate: existingcandidate._id,
       event: existingAssessmentEvent._id
    })
        const dataToSave = await newcandidateevent.save(); // mongo save
        res.status(200).json({ data: newcandidateevent , message: "new event candidate Created!"});
    });
    }
    catch(error){
        res.status(400).json({message: error.message}); //error.message
        
    }
  })

exports.createeventcandidate = createeventcandidate;


const express = require('express');

const eventcandidateDetailModel = require('../models/event_candidate');


const createeventcandidate = (async (req, res) => {
    const {
        assessment_id,
        organisation: {id, name}
        candidate:{id, name, email}
    } = req.body;

     const newassessmentcandidate = new eventcandidateDetailModel({
        assessment_id,
        organisation: {id, name}
        candidate:{id, name, email}
    })

     try{
        const dataToSave = await newassessmentcandidate.save(); // mongo save
        res.status(200).json({ data: newassessmentcandidate , message: "new assessmentcandidate Created!"});
    }
    catch(error){
        res.status(400).json({message: "Sorry could not create new assessmentcandidate" }); //error.message
        
    }
})

exports.createeventcandidate = createeventcandidate;
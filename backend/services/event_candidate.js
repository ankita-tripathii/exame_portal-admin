const express = require('express');

const eventcandidateDetailModel = require('../models/event_candidate');
var mongoose = require('mongoose');




const createeventcandidate = (async (req, res) => {
    const {
        candidate_id,
        event_id
    } = req.body;

     const newcandidateevent = new eventcandidateDetailModel({
       candidate: candidate_id,
       event: event_id
    })

     try{
        const dataToSave = await newcandidateevent.save(); // mongo save
        res.status(200).json({ data: newcandidateevent , message: "new candidateevent Created!"});
    }
    catch(error){
        res.status(400).json({message: error.message}); //error.message
        
    }
})

exports.createeventcandidate = createeventcandidate;

//------------------------------------------------------------------------------------


const geteventcandidate = (async (req, res) => {
    try {
        const eventCandidates = await eventcandidateDetailModel.find({"event": new mongoose.Types.ObjectId(req.params.id)})
        .populate('candidate');
        res.status(200).json(eventCandidates)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

exports.geteventcandidate = geteventcandidate;

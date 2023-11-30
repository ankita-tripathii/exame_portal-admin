const express = require('express');

const eventcandidateDetailModel = require('../models/event_candidate');


const geteventcandidate = (async (req, res) => {
    try {
        const eventCandidates = await eventcandidateDetailModel.findById(req.params.event_id)
            .populate("candidate");
        res.status(200).json(eventCandidates)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

exports.geteventcandidate = geteventcandidate;

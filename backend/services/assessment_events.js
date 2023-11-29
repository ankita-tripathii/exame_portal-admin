const express = require('express');

const assessmenteventDetailModel = require('../models/assessment_events');


const createassessmentevent = (async (req, res) => {
    const {
        assessment_id,
        slot: {startDate, lateLoginDuration, endDate}
    } = req.body;

     const newevent = new assessmenteventDetailModel({
        assessment_id,
        slot: {startDate, lateLoginDuration, endDate}
    })

     try{
        const dataToSave = await newevent.save(); // mongo save
        res.status(200).json({ data: newevent , message: "new assessmentevent Created!"});
    }
    catch(error){
        res.status(400).json({message: "Sorry could not create new assessmentevent" }); //error.message
        
    }
})

exports.createassessmentevent = createassessmentevent;
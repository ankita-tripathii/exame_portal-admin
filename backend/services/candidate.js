const express = require('express');

const candidateDetailModel = require('../models/candidate');


const createcandidate = (async (req, res) => {
    const {
        name,
        email,
        organisation: {id, name}
    } = req.body;

     const newcandidate = new assessmentDetailModel({
        name,
        email,
        organisation: {id, name}
    })

     try{
        const dataToSave = await newcandidate.save(); // mongo save
        res.status(200).json({ data: newcandidate , message: "new candidate Created!"});
    }
    catch(error){
        res.status(400).json({message: "Sorry could not create new candidate" }); //error.message
        
    }
})

exports.createcandidate = createcandidate;
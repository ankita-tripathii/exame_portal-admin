const express = require('express');

const organisationDetailModel = require('../models/organisation');


const createorganisation = (async (req, res) => {
    const {
        name,
        location:{state, pincode}
        contact: {emailId, contactNo}
    } = req.body;

     const neworganisation = new organisationDetailModel({
        name,
        location:{state, pincode}
        contact: {emailId, contactNo}
    })

     try{
        const dataToSave = await neworganisation.save(); // mongo save
        res.status(200).json({ data: neworganisation , message: "new organisation Created!"});
    }
    catch(error){
        res.status(400).json({message: "Sorry could not create new organisation" }); //error.message
        
    }
})

exports.createorganisation = createorganisation;
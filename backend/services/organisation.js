const express = require('express');

const organisationDetailModel = require('../models/organisation');



const allorganisation = ( async (req, res) => {
    try{
        const data= await organisationDetailModel.find();
       res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

exports.allorganisation = allorganisation;

//----------------------------------------------------------------


const createorganisation = (async (req, res) => {
    const {
        org_name,
        location: {state, pincode},
        contact: {emailId, contactNo}
    } = req.body;

     const neworganisation = new organisationDetailModel({
        org_name,
        location: {state, pincode},
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

//----------------------------------------------------------------------------------------------

const updateorganisation = (async (req, res) => {
     const {
        org_id,
        org_name,
        location: {state, pincode},
        contact: {emailId, contactNo}
    } = req.body;

     try{

        const updatedorganisation = await organisationDetailModel.findOneAndUpdate({"_id":org_id}, 
            {
                $set: {
                    "org_name": org_name,
                    "location.state": state,
                    "location.pincode": pincode,
                    "contact.emailId": emailId,
                    "contact.contactNo": contactNo
                      }
            },
            { new: true }
        );

     if (!updatedorganisation) {
            return res.status(404).json({ message: "organisation detail not found" });
        }

        res.status(200).json({ data: updatedorganisation , message: "organisation detail updated!"});
    }
    catch(error){
        res.status(400).json({message: error.message }); //error.message
        
    }
})

exports.updateorganisation = updateorganisation;


//-----------------------------------------------------------------------------------------------

const searchorgname = ( async (req, res) => {
     const orgnameSearchString = req.body.searchQuery;

     try{
        let searchData = await organisationDetailModel.find(
                { org_name: {$regex: orgnameSearchString, $options: 'i'}},
                { org_name: 1}
            );

        res.status(200).json({ data: searchData , message: "org name searched!"});
    }
    catch(error){
        res.status(400).json({message: "Sorry could not searched org name" });
        
    }
})

exports.searchorgname = searchorgname;
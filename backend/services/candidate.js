const express = require('express');

const candidateDetailModel = require('../models/candidate');


const allcandidate = ( async (req, res) => {
    try{
        const data= await candidateDetailModel.find();
       res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

exports.allcandidate = allcandidate;

//------------------------------------------------------------------------------


const createcandidate = (async (req, res) => {
    const {
        user_name,
        user_email,
        organisation: {org_id, org_name}
    } = req.body;

     const newcandidate = new candidateDetailModel({
        user_name,
        user_email,
        organisation: {org_id, org_name}
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

//--------------------------------------------------------------------------------------------------

const updatecandidate = (async (req, res) => {
     const {
        candidate_id,
        user_name,
        user_email,
        organisation: {org_id, org_name}
    } = req.body;

     try{

        const updatedcandidate = await candidateDetailModel.findOneAndUpdate({"_id":candidate_id, "organisation.org_id": org_id}, 
            {
                $set: {
                    "user_name": user_name,
                    "user_email": user_email,
                    "organisation.org_name": org_name
                      }
            },
            { new: true }
        );

     if (!updatedcandidate) {
            return res.status(404).json({ message: "candidate detail not found" });
        }

        res.status(200).json({ data: updatedcandidate , message: "candidate detail updated!"});
    }
    catch(error){
        res.status(400).json({message: error.message }); //error.message
        
    }
})

exports.updatecandidate = updatecandidate;

//----------------------------------------------------------------------------------------------------


const searchcandidate = ( async (req, res) => {
     const candidateSearchString = req.body.searchQuery;

     try{
        let searchData = await candidateDetailModel.find(
                { user_name: {$regex: candidateSearchString, $options: 'i'}},
                { user_name: 1, "organisation.org_name": 1}
            );

        res.status(200).json({ data: searchData , message: "candidate name searched!"});
    }
    catch(error){
        res.status(400).json({message: "Sorry could not searched candidate name" });
        
    }
})

exports.searchcandidate = searchcandidate;

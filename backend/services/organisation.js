const express = require('express');
const adminApprovedMiddleware = require('../routes/accountvarify');
const organisationDetailModel = require('../models/organisation');





const createorganisation = (async (req, res) => {

     try{
        await adminApprovedMiddleware(req, res, async () => {
            const {
        org_name,
        location: {state, pincode},
        contact: {emailId, contactNo},
        isApproved 
    } = req.body;

     const neworganisation = new organisationDetailModel({
        org_name,
        location: {state, pincode},
        contact: {emailId, contactNo},
        isApproved
    })
        const dataToSave = await neworganisation.save(); // mongo save
        res.status(200).json({ data: neworganisation , message: "new organisation Created!"});
    });
    }
    catch(error){
        res.status(400).json({message: "Sorry could not create new organisation" }); //error.message
        
    }
})

exports.createorganisation = createorganisation;

//----------------------------------------------------------------------------------------------

const updateorganisation = (async (req, res) => {

     try{
        await adminApprovedMiddleware(req, res, async () => {
             const {
        org_id,
        org_name,
        location: {state, pincode},
        contact: {emailId, contactNo}
         } = req.body;
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
    });
    }
    catch(error){
        res.status(400).json({message: error.message }); //error.message
        
    }
})

exports.updateorganisation = updateorganisation;


//-----------------------------------------------------------------------------------------------




const allorganisation = (async (req, res) => {
    const SearchString = req.body.searchQuery;

    try {
        if (SearchString === null || SearchString === undefined) {
            let allOrganisation = await organisationDetailModel.find();
            res.status(200).json({ data: allOrganisation, message: "All organisation retrieved!" });
        } else {
            let searchData = await organisationDetailModel.find(
                        { org_name: { $regex: SearchString, $options: 'i' }},
                        { org_name: 1, "location.state": 1, "location.pincode": 1, "contact.emailId": 1, "contact.contactNo": 1}
            );

            res.status(200).json({ data: searchData, message: "org name searched!" });
        }
    } catch (error) {
        res.status(400).json({ message: "Sorry, could not search org name" });
    }
})

exports.allorganisation = allorganisation;

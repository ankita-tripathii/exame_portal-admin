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
            const org_id = req.params.org_id;

             const {
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
    const page = parseInt(req.query.page) || 1; // Current page number
    const pageSize = parseInt(req.query.pageSize) || 6; // Number of items per page

    try {
            let query = {};

        if (SearchString === null || SearchString === undefined) {

            const totalCount = await organisationDetailModel.countDocuments();

            let allOrganisation = await organisationDetailModel.find().sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize);

            res.status(200).json({ data: allOrganisation, currentPage: page, totalPages: Math.ceil(totalCount / pageSize),
             totalItems: totalCount, message: "All organisation retrieved!" });
        } 
        else {
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

//-------------------------------------------------



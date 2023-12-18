const express = require('express');
const adminApprovedMiddleware = require('../routes/accountvarify');
const candidateDetailModel = require('../models/candidate');
const organisationDetailModel = require('../models/organisation');



const createcandidate = (async (req, res) => {

     try{
        await adminApprovedMiddleware(req, res, async () => {
            const {
        user_name,
        user_email,
        org_name
         } = req.body;

         const existingorganization = await organisationDetailModel.findOne({org_name });

            if (!existingorganization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

     const newcandidate = new candidateDetailModel({
        user_name,
        user_email,
        organisation_id: existingorganization._id
         })

        const dataToSave = await newcandidate.save(); // mongo save
        res.status(200).json({ data: newcandidate , message: "new candidate Created!"});
    });
    }
    catch(error){
        res.status(400).json({message: "Sorry could not create new candidate" }); //error.message
        
    }
})

exports.createcandidate = createcandidate;

//--------------------------------------------------------------------------------------------------

const updatecandidate = (async (req, res) => {

     try{
        await adminApprovedMiddleware(req, res, async () => {

            const candidate_id = req.params.candidate_id;

            const {
        user_name,
        user_email,
         org_name 
         } = req.body;

          const existingOrganization = await organisationDetailModel.findOne({ org_name });

             if (!existingOrganization) {
                return res.status(404).json({ message: 'Organization not found' });
            }

            const updatedcandidate = await candidateDetailModel.findOneAndUpdate({"_id":candidate_id}, 
            {
                $set: {
                    "user_name": user_name,
                    "user_email": user_email,
                    "organisation_id": existingOrganization._id
                      }
            },
            { new: true }
        );

     if (!updatedcandidate) {
            return res.status(404).json({ message: "candidate detail not found" });
        }

        res.status(200).json({ data: updatedcandidate , message: "candidate detail updated!"});
    });
    }
    catch(error){
        res.status(400).json({message: error.message }); //error.message
        
    }
})

exports.updatecandidate = updatecandidate;

//----------------------------------------------------------------------------------------------------

const allcandidate = (async (req, res) => {
    const SearchString = req.body.searchQuery;
    const page = parseInt(req.query.page) || 1; // Current page number
    const pageSize = parseInt(req.query.pageSize) || 5; // Number of items per page

    try {

         let query = {};

        if (SearchString === null || SearchString === undefined) {

            const totalCount = await candidateDetailModel.countDocuments();

            let allCandidates = await candidateDetailModel.find().populate('organisation_id', 'org_name').skip((page - 1) * pageSize).limit(pageSize);
            res.status(200).json({ data: allCandidates, currentPage: page, totalPages: Math.ceil(totalCount / pageSize),
             totalItems: totalCount, message: "All candidates retrieved!" });
        }
         else {

            const organisation_name = await organisationDetailModel.find(
                { org_name: { $regex: SearchString, $options: 'i' } }
                );

            let searchData = await candidateDetailModel.find(
                {
                    $or: [
                        { user_name: {$regex: SearchString, $options: 'i'} },
                        { organisation_id: { $in: organisation_name.map(org => org._id) } }
                    ]
                },

                { user_name: 1, user_email: 1, organisation_id: 1 }
            ).populate('organisation_id', 'org_name');

            res.status(200).json({ data: searchData, message: "user name  or org name searched!" });
        }
    } 
    catch (error) {
        res.status(400).json({ message: "Sorry, could not search user name or org name" });
    }
})

exports.allcandidate = allcandidate;

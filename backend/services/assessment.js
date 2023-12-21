const express = require('express');

const assessmentDetailModel = require('../models/assessment');
const adminApprovedMiddleware = require('../routes/accountvarify');

const organisationDetailModel = require('../models/organisation');


const createassessment = (async (req, res) => {
    try {
        await adminApprovedMiddleware(req, res, async () => {
            const {
                title,
                duration,
                question_count,
                org_name
            } = req.body;

            const existingorganization = await organisationDetailModel.findOne({org_name });

            if (!existingorganization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

            const newassessment = new assessmentDetailModel({
                title,
                duration,
                question_count,
                organisation_id: existingorganization._id
            });

            const dataToSave = await newassessment.save();
            res.status(200).json({ data: newassessment, message: 'New assessment created!' });
        });
    } catch (error) {
        res.status(400).json({ message: 'Sorry, could not create new assessment' });
    }
});


exports.createassessment = createassessment;

//-----------------------------------------------------------------------------------------------------

const updateassessment = (async (req, res) => {

     try{
        await adminApprovedMiddleware(req, res, async () => {

            const assessment_id = req.params.assessment_id;

            const {
                title,
                duration,
                question_count,
                org_name 
            } = req.body;

            const existingOrganization = await organisationDetailModel.findOne({ org_name });

             if (!existingOrganization) {
                return res.status(404).json({ message: 'Organization not found' });
            }

        const updatedassessment = await assessmentDetailModel.findOneAndUpdate({"_id":assessment_id}, 
        	{
                $set: {
                    "title": title,
                    "duration": duration,
                    "question_count": question_count,
                    "organisation_id": existingOrganization._id
                }
            },
            { new: true }
        );

     if (!updatedassessment) {
            return res.status(404).json({ message: "assessment not found" });
        }

        res.status(200).json({ data: updatedassessment , message: "assessment updated!"});
    });
    }
    catch(error){
        res.status(400).json({message: error.message }); //error.message
        
    }
})

exports.updateassessment = updateassessment;

//--------------------------------------------------------------------------------------------------


const allassessment = (async (req, res) => {
    const SearchString = req.body.searchQuery;
    const page = parseInt(req.query.page) || 1; // Current page number
    const pageSize = parseInt(req.query.pageSize) || 5; // Number of items per page

    try {

         let query = {};

        if (SearchString === null || SearchString === undefined) {

            const totalCount = await assessmentDetailModel.countDocuments();

            let allAssessments = await assessmentDetailModel.find().populate('organisation_id', 'org_name').sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize);
            res.status(200).json({ data: allAssessments, currentPage: page, totalPages: Math.ceil(totalCount / pageSize),
             totalItems: totalCount, message: "All assessments retrieved!" });
        }
         else {

            const organisation_name = await organisationDetailModel.find(
                { org_name: { $regex: SearchString, $options: 'i' } }
                );

            let searchData = await assessmentDetailModel.find(
                {
                    $or: [
                        { title: { $regex: SearchString, $options: 'i' } },
                        { organisation_id: { $in: organisation_name.map(org => org._id) } }
                    ]
                },

                { title: 1, duration: 1, question_count: 1, organisation_id: 1 }
            ).populate('organisation_id', 'org_name');

            res.status(200).json({ data: searchData, message: "Title or org name searched!" });
        }
    } 
    catch (error) {
        res.status(400).json({ message: "Sorry, could not search title or org name" });
    }
})

exports.allassessment = allassessment;

//------------------------------------------------------------------------------------------


const allassessment_title =( async (req, res) => {
    try {
        const title = await assessmentDetailModel.find({}, 'title'); // Fetch only title
        res.status(200).json({ data: title, message: "all title retrieved"  });
    } catch (error) {
        res.status(500).json({ message: "Error fetching title" });
    }
});

exports.allassessment_title = allassessment_title;


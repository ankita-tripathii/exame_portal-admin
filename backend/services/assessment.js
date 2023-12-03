const express = require('express');

const assessmentDetailModel = require('../models/assessment');

 const allassessment = ( async (req, res) => {
    try{
        const data= await assessmentDetailModel.find();
       res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

exports.allassessment = allassessment;

//----------------------------------------------------------------------


const createassessment = (async (req, res) => {
    const {
        title,
        duration,
        question_count,
        organisation: {org_id, org_name}
    } = req.body;

     const newassessment = new assessmentDetailModel({
        title,
        duration,
        question_count,
        organisation: {org_id, org_name}
    })

     try{
        const dataToSave = await newassessment.save(); // mongo save
        res.status(200).json({ data: newassessment , message: "new assessment Created!"});
    }
    catch(error){
        res.status(400).json({message: "Sorry could not create new assessment" }); //error.message
        
    }
})

exports.createassessment = createassessment;

//-----------------------------------------------------------------------------------------------------

const updateassessment = (async (req, res) => {
     const {
        assessment_id,
        title,
        duration,
        question_count,
        organisation: {org_id, org_name}
    } = req.body;

     try{

        const updatedassessment = await assessmentDetailModel.findOneAndUpdate({"_id":assessment_id, "organisation.org_id": org_id}, 
        	{
                $set: {
                    "title": title,
                    "duration": duration,
                    "question_count": question_count,
                    "organisation.org_name": org_name
                }
            },
            { new: true }
        );

     if (!updatedassessment) {
            return res.status(404).json({ message: "assessment not found" });
        }

        res.status(200).json({ data: updatedassessment , message: "assessment updated!"});
    }
    catch(error){
        res.status(400).json({message: error.message }); //error.message
        
    }
})

exports.updateassesment = updateassessment;

//--------------------------------------------------------------------------------------------------


// const searchtitleANDorgname = ( async (req, res) => {
//      const SearchString = req.body.searchQuery;

//      try{
//         let searchData = await assessmentDetailModel.find(
//                 { $or: [{ title: {$regex: SearchString, $options: 'i'}},{"organisation.org_name":{$regex: SearchString, $options: 'i'}}]},
//                 { title: 1, "organisation.org_name": 1}
//             );

//         res.status(200).json({ data: searchData , message: "title or org name searched!"});
//     }
//     catch(error){
//         res.status(400).json({message: "Sorry could not searched title or org name" });
        
//     }
// })

// exports.searchtitleANDorgname = searchtitleANDorgname;


//---------------------------------------------------------------------------------------------------


const searchtitleANDorgname = (async (req, res) => {
    const SearchString = req.body.searchQuery;

    try {
        if (SearchString === null || SearchString === undefined) {
            const allAssessments = await assessmentDetailModel.find();
            res.status(200).json({ data: allAssessments, message: "All assessments retrieved!" });
        } else {
            let searchData = await assessmentDetailModel.find(
                {
                    $or: [
                        { title: { $regex: SearchString, $options: 'i' } },
                        { "organisation.org_name": { $regex: SearchString, $options: 'i' } }
                    ]
                },
                { title: 1, "organisation.org_name": 1 }
            );

            res.status(200).json({ data: searchData, message: "Title or org name searched!" });
        }
    } catch (error) {
        res.status(400).json({ message: "Sorry, could not search title or org name" });
    }
})

exports.searchtitleANDorgname = searchtitleANDorgname;





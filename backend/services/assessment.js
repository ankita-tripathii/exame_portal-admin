const express = require('express');

const assessmentDetailModel = require('../models/assessment');


const createassessment = (async (req, res) => {
    const {
        title,
        duration,
        question_count,
        organisation: {id, name}
    } = req.body;

     const newassessment = new assessmentDetailModel({
        title,
        duration,
        question_count,
        organisation: {id, name}
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
        organisation: {id, name}
    } = req.body;

     try{

        const updatedassessment = await assessmentDetailModel.findOneAndUpdate({"_id":assessment_id, "organisation.id": id}, 
        	{
                $set: {
                    "title": title,
                    "duration": duration,
                    "question_count": question_count,
                    "organisation.name": name
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

exports.updateassesment = updateassesment;

//--------------------------------------------------------------------------------------------------
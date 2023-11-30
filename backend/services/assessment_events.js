const express = require('express');

const assessmenteventDetailModel = require('../models/assessment_events');



const allevent = ( async (req, res) => {
    try{
        const data= await assessmenteventDetailModel.find();
       res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

exports.allevent = allevent;


//----------------------------------------------------------------------------------------


const createassessmentevent = (async (req, res) => {
    const {
        assessment_id,
        slot: {startDate, lateLoginDuration, endDate}
    } = req.body;

     const newevent = new assessmenteventDetailModel({
        assessment_id,
        slot: {startDate, lateLoginDuration, endDate}
    })

     try{
        const dataToSave = await newevent.save(); // mongo save
        res.status(200).json({ data: newevent , message: "new assessmentevent Created!"});
    }
    catch(error){
        res.status(400).json({message: "Sorry could not create new assessmentevent" }); //error.message
        
    }
})

exports.createassessmentevent = createassessmentevent;

//---------------------------------------------------------------------------------

const updateassessmentevent = (async (req, res) => {
     const {
        assessmentevent_id,
        slot: {startDate, lateLoginDuration, endDate}
    } = req.body;

     try{

        const updatedassessmentevent = await assessmenteventDetailModel.findOneAndUpdate({"_id":assessmentevent_id}, 
            {
                $set: {
                    "slot.startDate": startDate,
                    "slot.lateLoginDuration": lateLoginDuration,
                    "slot.endDate": endDate
                }
            },
            { new: true }
        );

     if (!updatedassessmentevent) {
            return res.status(404).json({ message: "assessment not found" });
        }

        res.status(200).json({ data: updatedassessmentevent , message: "assessment updated!"});
    }
    catch(error){
        res.status(400).json({message: error.message }); //error.message
        
    }
})

exports.updateassessmentevent = updateassessmentevent;

//--------------------------------------------------------------------------------------------------


const searchassessmentevent = ( async (req, res) => {
     const eventSearchString = req.body.searchQuery;

     try{
        let searchData = await assessmenteventDetailModel.find({
            $or: [
                { 'slot.startDate': { $gte: eventSearchString } },
                { 'slot.endDate': { $lte: eventSearchString } },
            ]
        });

        res.status(200).json({ data: searchData , message: "event searched!"});
    }
    catch(error){
        res.status(400).json({message: "Sorry could not searched event", error: error.message });
        
    }
})

exports.searchassessmentevent = searchassessmentevent;
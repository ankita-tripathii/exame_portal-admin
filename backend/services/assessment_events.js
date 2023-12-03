const express = require('express');

const assessmenteventDetailModel = require('../models/assessment_events');
const eventCandidateModel = require('../models/event_candidate');
const assessmentModel = require('../models/assessment');


// const allevent = ( async (req, res) => {
//     try{
//         const {filter, search_assessment_title} = req.body;

//         //let data= await assessmenteventDetailModel.find().populate("assessment_id"); // assessment title, candidate count

//         // M1
//              // let events = await assessmenteventDetailModel.find({}); // Fetch all events
//              // let eventData = [];

//              //    await Promise.all(events.map(async (event) => {
//              //        const eventCandidateCount = await eventCandidateModel.countDocuments({ event: event._id });
//              //        const { _id, slot, createdAt, assessment_id } = event;
//              //        const event_assessment = await assessmentModel.findById(assessment_id);
        
//              //        eventData.push({
//              //            _id,
//              //            eventCandidateCount,
//              //            slot,
//              //            createdAt,
//              //            assessment_id,
//              //            event_assessment
//              //        });
//              //    }));

//         // M2
//                // Aggregate query pipeline  : lookup, unwind, project, match
//         let data1 = await assessmenteventDetailModel.aggregate(
//             [   
//                 {
//                   $lookup : {
//                     from: "eventcandidates", //notice the "s" at the end
//                     localField: "_id",
//                     foreignField: "event",
//                     as: "event_candidate"
//                   }   
//                 },
//                 {
//                   $lookup : {
//                     from: "assessments", //notice the "s" at the end
//                     localField: "assessment_id",
//                     foreignField: "_id",
//                     as: "event_assessment"
//                   }   
//                 },
//                 {$unwind: '$event_assessment'},
//                 {
//                     $project: {
//                         eventCandidateCount : { $size: "$event_candidate" },
//                         slot : 1,
//                         createdAt: 1,
//                         assessment_id: 1,
//                         event_assessment: 1
//                     }
//                 }
//             ]
//             );
       

//        res.status(200).json(data1)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

// exports.allevent = allevent;

// "_id": "65678394a960eaf5d9707010",
//         "assessment_id": "65676fc16659df76242a5556",
//         "slot": {
//             "startDate": "2023-11-02T18:30:00.000Z",
//             "lateLoginDuration": 15,
//             "endDate": "2023-11-02T18:30:00.000Z"
//         },
//         "createdAt": "2023-11-29T18:31:48.158Z",
//         "event_assessment": {
//             "_id": "65676fc16659df76242a5556",
//             "title": "assessment 1",
//             "duration": 60,
//             "question_count": 50,
//             "organisation": {
//                 "org_id": "65676b476659df76242a554c",
//                 "org_name": "Reliance"
//             },
//             "createdAt": "2023-11-29T17:07:13.518Z",
//             "updatedAt": "2023-11-29T17:07:13.518Z",
//             "__v": 0
//         },
//         "eventCandidateCount": 1
//     },

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



const allevent = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { filter: {exam_start_date, organisation_name},
                search_assessment_title 
            } = req.body;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;

        const matchStage = {};

        // Apply filters if they exist in the request
                console.log('Filters:', { exam_start_date, organisation_name });

        if (exam_start_date !== null) {
            matchStage['slot.startDate'] = new Date(exam_start_date);
        }
        if (organisation_name !== null) {
            matchStage['event_assessment.organisation.org_name'] = organisation_name;
            
        }
        // Apply search if assessment title exists in the request
                console.log('Match Stage:', matchStage);

        const searchPipeline = [];
        if (search_assessment_title !== null) {
            searchPipeline.push({
                $match: {
                    'event_assessment.title': { $regex: search_assessment_title, $options: 'i' }
                }
            });
        }
console.log('Value of organisation_name:', organisation_name);
        // Aggregate query pipeline with filtering, searching, and pagination
        const pipeline = [
            { $match: matchStage },
            {
                $lookup: {
                    from: 'eventcandidates',
                    localField: '_id',
                    foreignField: 'event',
                    as: 'event_candidate'
                }
            },
            {
                $lookup: {
                    from: 'assessments',
                    localField: 'assessment_id',
                    foreignField: '_id',
                    as: 'event_assessment'
                }
            },
            { $unwind: '$event_assessment' },
            ...searchPipeline,
            {
                $project: {
                    eventCandidateCount: { $size: '$event_candidate' },
                    slot: 1,
                    createdAt: 1,
                    assessment_id: 1,
                    event_assessment: 1
                }
            },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ];
console.log('Pipeline:', pipeline);

        const data = await assessmenteventDetailModel.aggregate(pipeline);
        const totalCount = await assessmenteventDetailModel.countDocuments(matchStage);
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            currentPage: page,
            totalPages,
            totalCount,
            data,
            message: "Assessment details retrieved with pagination and filtering!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.allevent = allevent;


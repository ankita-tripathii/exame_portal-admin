const express = require('express');

const adminApprovedMiddleware = require('../routes/accountvarify');

const assessmenteventDetailModel = require('../models/assessment_events');
const eventCandidateModel = require('../models/event_candidate');
const assessmentDetailModel = require('../models/assessment');
const organisationDetailModel = require('../models/organisation');
const moment = require('moment-timezone');

const createassessmentevent = (async (req, res) => {

     try{
        await adminApprovedMiddleware(req, res, async () => {
        const {
        title,
        slot: {startDate, lateLoginDuration, endDate, timeZone},
         } = req.body;

          const existingassessment = await assessmentDetailModel.findOne({ title });

            if (!existingassessment) {
            return res.status(404).json({ message: 'title not found' });
        }

            // Create a moment object from the provided startDate and endDate in IST
      const istStartDate = moment.tz(startDate, 'Asia/Kolkata');
      const istEndDate = moment.tz(endDate, 'Asia/Kolkata');

      // Convert IST startDate and endDate to the selected timeZone
      const convertedStartDate = istStartDate.clone().tz(timeZone).toDate();
      const convertedEndDate = istEndDate.clone().tz(timeZone).toDate();

     const newevent = new assessmenteventDetailModel({
        assessment_id: existingassessment._id,
        slot: {startDate: convertedStartDate, 
               lateLoginDuration, 
               endDate: convertedEndDate,
               timeZone
           }
        })

        const dataToSave = await newevent.save(); // mongo save
        res.status(200).json({ data: newevent , message: "new assessmentevent Created!"});
    });
    }
    catch(error){
        res.status(400).json({message: "Sorry could not create new assessmentevent" }); //error.message
        
    }
})

exports.createassessmentevent = createassessmentevent;

//---------------------------------------------------------------------------------

const updateassessmentevent = (async (req, res) => {

     try{
        await adminApprovedMiddleware(req, res, async () => {

        const assessmentevent_id = req.params.assessmentevent_id;

        const {
        title,    
        slot: {startDate, lateLoginDuration, endDate}
        } = req.body;

        const existingassessment = await assessmentDetailModel.findOne({ title });

            if (!existingassessment) {
            return res.status(404).json({ message: 'title not found' });
        }

         const updatedassessmentevent = await assessmenteventDetailModel.findOneAndUpdate({"_id":assessmentevent_id}, 
            {
                $set: {
                    "assessment_id": existingassessment._id,
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
    });
    }
    catch(error){
        res.status(400).json({message: error.message }); //error.message
        
    }
})

exports.updateassessmentevent = updateassessmentevent;

//--------------------------------------------------------------------------------------------------



const allevent = async (req, res) => {
    try {

        const { filter: {exam_start_date, organisation_name},
                search_assessment_title 
            } = req.body;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const matchStage = {};

        if (exam_start_date !== null) {
            matchStage['slot.startDate'] = new Date(exam_start_date);
        }
        if (organisation_name !== null) {
            matchStage['organisation.org_name'] = organisation_name;
            
        }

        const searchPipeline = [];
        if (search_assessment_title !== null) {
            searchPipeline.push({
                $match: {
                    'event_assessment.title': { $regex: search_assessment_title, $options: 'i' }
                }
            });
        }
        // Aggregate query pipeline with filtering, searching, and pagination
        let pipeline = [
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
            {
              $lookup: {
                from: 'organisations', // Update this to the correct name of your organisation collection
                localField: 'event_assessment.organisation_id', // Assuming 'organisation_id' is the field in 'assessments' referencing organisations
                foreignField: '_id',
                as: 'organisation'
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
                    event_assessment: 1,
                    organisation: { $arrayElemAt: ['$organisation', 0] }
                }
            },
            {
             $sort: { createdAt: -1 } // Sort by createdAt in descending order
            },
            { $skip: (page - 1) * limit },
            { $limit: limit }

            
        ];

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

//-------------------------------------------------------------------------------------------------

// const allevent = ( async (req, res) => {
//     try{
//         const {filter, search_assessment_title} = req.body;

// //         //let data= await assessmenteventDetailModel.find().populate("assessment_id"); // assessment title, candidate count

// //         // M1
// //              // let events = await assessmenteventDetailModel.find({}); // Fetch all events
// //              // let eventData = [];

// //              //    await Promise.all(events.map(async (event) => {
// //              //        const eventCandidateCount = await eventCandidateModel.countDocuments({ event: event._id });
// //              //        const { _id, slot, createdAt, assessment_id } = event;
// //              //        const event_assessment = await assessmentModel.findById(assessment_id);
        
// //              //        eventData.push({
// //              //            _id,
// //              //            eventCandidateCount,
// //              //            slot,
// //              //            createdAt,
// //              //            assessment_id,
// //              //            event_assessment
// //              //        });
// //              //    }));

// //         // M2
// //                // Aggregate query pipeline  : lookup, unwind, project, match
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

//----------------------------------------------------------------------------------------
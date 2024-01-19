const assessmenteventDetailModel = require('../models/assessment_events');
const assessmentDetailModel = require('../models/assessment');
const organisationDetailModel = require('../models/organisation');

// Library to create CSV file
const ObjectsToCsv = require('objects-to-csv'); //new add

const { v4: uuidv4 }= require('uuid'); 

// To read and write file to Disk
const Fs = require('fs');

// Important Library
const _ = require('lodash');

// to handle environment variables
require('dotenv').config();

// AWS SDK : to interact with AWS S3.
const AWS = require('aws-sdk');

// aws config
const s3Config = { 
    signatureVersion: 'v4', 
    region: process.env.COGNITO_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};




const csvUpload = (async (req, res) => {
   
     try{ 

        const eventData = await assessmenteventDetailModel.find();

        // console.log('eventData:', eventData);

        const csvobject = await Promise.all(eventData.map ( async(event) => {

        const assessment = await assessmentDetailModel.findById(event.assessment_id);
        
        const organisation = await organisationDetailModel.findById(assessment.organisation_id);


            return [
                assessment.title, // Add assessment title to CSV
                organisation.org_name, // Add organisation name to CSV
                event.slot.startDate,
                event.slot.lateLoginDuration,
                event.slot.endDate,
                event.slot.timeZone
                
            ];
        })
        );

         csvobject.reverse();

        // console.log(csvobject)
 
        const headers = ["Assessment Title", "Organisation Name", "Start Date", "Late Login Duration", "End Date", "Time Zone"];
        const dataToCSV = createDataForCSV(csvobject, headers);

        // console.log(dataToCSV)

        let fileNameId = uuidv4();
        fileName = "test"+fileNameId+".csv";

        // Write CSV file to disk
        await writeToCsv(dataToCSV,fileName);

        
        // Continue with S3 upload and response handling
        const resp = await uploadons3(fileName, './uploads/'+fileName);
        if(resp && resp.filePath) {
           await Fs.rmSync('./uploads/'+fileName);
            res.status(200).json({ message: 'CSV uploaded successfully :',filePath:resp.filePath });
        }

  }
   catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
   
});

function createDataForCSV(csvobject, headers) {
    let dataToCSV = [];
    for (let i = 0; i < csvobject.length; i++) {
        let row = csvobject[i];
        let obj = {};
        for (let j = 0; j < headers.length; j++) {
            if (Array.isArray(row[j])) {
                obj[headers[j].trim()] = row[j].join(', '); // Join multiple data in one cell with a comma and space
            } else {
                obj[headers[j].trim()] = row[j];
            }
        }
        dataToCSV.push(obj);
    }
    return dataToCSV;
}


exports.csvUpload = csvUpload;


// create csv from data
async function writeToCsv(data, uniqueFileName) {
    return new Promise(async (resolve) => {
      const csv = new ObjectsToCsv(data);
      const filename = uniqueFileName;
      await csv.toDisk("./uploads" + '/' + filename);//, {allColumns: true}
      console.log('DONE', "./uploads" + '/' + filename);
      resolve('done');
    }).catch((err) => {
      console.error(
        'Error while trying to write the csv file - ' +
          JSON.stringify(err, null, 2)
      );
      throw err
    });
}

// Used for M2 to upload file by reading from disk and sending directly to S3.
async function uploadons3(fname, filepath) {
    try {
        fname = fname
        const s3 = new AWS.S3(s3Config);
        console.log(`----ulpoad s3 function starts, file path--- ${filepath}`)
        const data = Fs.readFileSync(filepath);
        const params = {
        Key : fname,
        Body : data,
        Bucket : process.env.S3_BUCKET,
        ACL: "public-read"
        }
        let response = await new Promise((resolve, reject) => {
        s3.upload(params, async function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve({ "fileName": fname, "filePath": data.Location});
            }
        })
        }).catch(err => {
        console.log(`--upload on s3 catch--err--- ${err}`);
        });
        return response;

      }
      catch(err) {
        throw err
      }
}
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




const updateFiles = (async (req, res) => {
     
try{ 

        let fileName = req.files[0].filename;
        const originalname = req.files[0].originalname.split(".")[0]; 
        const ext = req.files[0].originalname.split(".")[1];

        // Remove spaces from the original name and replace with underscores or dashes
        const ModifiedOriginalname = originalname.replace(/\s+/g, '_'); 
        let myKey = ModifiedOriginalname+fileName+"."+ext;

       
        const resp = await uploadons3(myKey, './uploads/'+fileName);
        if(resp && resp.filePath) {

            // deleting file uploaded using multer in local disk
            Fs.rmSync('./uploads/'+fileName);

            return res.json({ message: "https://talentnext-prod-vacancy-jd.s3.ap-south-1.amazonaws.com/"+myKey});     
        }else{
            return res.json({ message: "Upload failed, please try again" }); 
        }
        
    }
    catch(error){
        return res.status(400).json({message: error.message }); //error.message
        
    }
});

exports.updateFiles = updateFiles;


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
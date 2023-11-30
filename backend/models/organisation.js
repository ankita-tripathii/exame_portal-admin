const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    org_name: {
        type: String,
        required: true,
        maxlength: 100
    },
    location:{
                state:{
                    required: true,
                    type: String
                },
                pincode:{
                    required: true,
                    type: Number
                }
    },
    contact: {
                emailId: {
                    required: true,
                    type: String,
                    maxlength: 100
                },
                contactNo: {
                    required: true,
                    type: String,
                    maxlength: 20
                }
    }
   },
    {
  timestamps: true
    });

module.exports = mongoose.model('organisation', organisationSchema);

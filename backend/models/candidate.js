const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        maxlength: 100
    },
    user_email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    organisation: {
        org_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'organisation',
            required: true
        },
        org_name: {
            type: String,
            ref: 'organisation',
            required: true
        }
   }
   },
   {
    timestamps: true
   });

module.exports = mongoose.model('candidate', candidateSchema);

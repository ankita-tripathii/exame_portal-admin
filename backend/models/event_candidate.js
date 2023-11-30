const mongoose = require('mongoose');

const eventCandidateSchema = new mongoose.Schema({

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
    },
    candidate: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'candidate',
            required: true
        },
        user_name: {
            type: String,
            ref: 'candidate',
            required: true
        },
        user_email: {
            type: String,
            ref: 'candidate',
            required: true
        }
    },
    event:{
        event_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'assessmentevents',
            required: true
        }
    }
  },
    {
  timestamps: true
});

module.exports = mongoose.model('eventcandidate', eventCandidateSchema);


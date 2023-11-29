const mongoose = require('mongoose');

const eventCandidateSchema = new mongoose.Schema({
    assessment_id:  {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'assessment',
            required: true
    },
    organisation: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'organisation',
            required: true
        },
        name: {
            type: String,
            ref: 'organisation',
            required: true
        }
    },
    candidate: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'candidate',
            required: true
        },
        name: {
            type: String,
            ref: 'candidate',
            required: true
        },
        email: {
            type: String,
            ref: 'candidate',
            required: true
        }
    },
    {
  timestamps: true
});

module.exports = mongoose.model('assessmentcandidate', eventCandidateSchema);


const mongoose = require('mongoose');

const eventCandidateSchema = new mongoose.Schema({

    candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'candidate',
            required: true
        
    },
    event:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'assessmentevents',
            required: true
    }
  },
    {
  timestamps: true
});

module.exports = mongoose.model('eventcandidate', eventCandidateSchema);


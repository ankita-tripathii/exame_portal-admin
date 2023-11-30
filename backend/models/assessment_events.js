const mongoose = require('mongoose');

const assessmenteventsSchema = new mongoose.Schema({
    assessment_id:  {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'assessment',
         required: true
    },
    slot: {
        startDate: {
            type: Date,
            required: true
        },
        lateLoginDuration: {//minutes
            type: Number,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    
}
},
{
        timestamps: true
});

module.exports = mongoose.model('assessmentevents', assessmenteventsSchema);

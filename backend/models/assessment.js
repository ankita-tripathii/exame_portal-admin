const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    duration: {
        type: Number,
        required: true
    },
    question_count: {
        type: Number,
        required: true
    },
    slot: {
        type: Date,
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
{
    timestamps: true
});

module.exports = mongoose.model('assessment', assessmentSchema);

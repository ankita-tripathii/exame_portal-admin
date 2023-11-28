const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    organisation: organisation: {
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

module.exports = mongoose.model('candidate', candidateSchema);

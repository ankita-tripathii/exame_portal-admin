const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        min: 6,
        max: 250
    },
    emailId: { // Model validation regex
        required: true,
        type: String,
        min: 6,
        max: 250
    },
    password: {
        required: true,
        type: String,
        min: 6,
        max: 250
    }
},
{
  timestamps: true
})

module.exports = mongoose.model('AdminDetail', dataSchema)

 
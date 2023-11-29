const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        min: 6,
        max: 250
    },
    emailId: {
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
    },
    role: {
        type: String,
        enum: ['admin', 'delivery_head'],
        required: true     
    },
    isApproved: {
        type: Boolean,
        default: false
    }
},
{
  timestamps: true
})

module.exports = mongoose.model('account', accountSchema)

 
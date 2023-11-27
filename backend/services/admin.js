const express = require('express');


const bcrypt = require('bcryptjs');


const adminDetailModel = require('../models/admin');


const signUP = (async (req, res) => {
    const { name,
            emailId, 
            password 
            } = req.body;//destructuring, es6 new changes

    // Check if email already exists
    const emailExists = await adminDetailModel.findOne({emailId : emailId});
        if (emailExists) {
        return res.status(400).json({ message: 'Email already exists please login' });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

    // Create new user object
    const newadmin = new adminDetailModel ({
        name,
        emailId,
        password: hashedpassword,
    })

    try{
    // Save the user to the database
    const dataToSave = newadmin.save();
    res.status(200).json({ message: 'User signup successfully'}); 
    }

     catch (error) {
    console.error(error);
    res.status(400).json({ message: 'An error occurred' });
     }
});

exports.signUP = signUP;
const express = require('express');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const accountDetailModel = require('../models/account');


const signUP = (async (req, res) => {
    const { name,
            emailId, 
            password,
            role,
            isApproved 
            } = req.body;//destructuring, es6 new changes

    // Check if email already exists
    const emailExists = await accountDetailModel.findOne({emailId : emailId});
        if (emailExists) {
        return res.status(400).json({ message: 'Email already exists please login' });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

    // Create new user object
    const newaccount = new accountDetailModel ({
        name,
        emailId,
        password: hashedpassword,
        role,
        isApproved
    })

    try{
    // Save the user to the database
    const dataToSave = newaccount.save();
    res.status(200).json({ message: 'User signup successfully'}); 
    }

     catch (error) {
    console.error(error);
    res.status(400).json({ message: 'An error occurred' });
     }
});

exports.signUP = signUP;

//-------------------------------------


const logIN = (async (req, res) => {
    const { emailId,
            password } = req.body;

    // Check if the user exists
    const emailExists = await accountDetailModel.findOne({emailId : emailId, isApproved: true,});
    if (!emailExists) {
        return res.status(400).json({ message: 'Invalid emailId or Your account isnt approved yet' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    

    const passwordExists = await bcrypt.compare(password, emailExists.password);
    if (!passwordExists) {
        return res.status(400).json({ message: 'Invalid password' });
    }

     try{
        const token = jwt.sign({emailId: emailExists.emailId, name: emailExists.name, role: emailExists.role, isApproved: emailExists.isApproved}, process.env.TOKEN_SECRET,  {expiresIn: '3600s' });
    res.status(200).json({ token: token});
    }

     catch (error) {
    console.error(error);
    res.status(400).json({ message: 'An error occurred' });
     }
});

exports.logIN = logIN;
const User = require('../models/userModels');
const express = require('express');
const nodemailer = require('nodemailer');


const userLogin = async (req, res) => {

    try{

        const {email, password, name} = req.body;
        const user = await User.findOne({email});


        if(!user){

            return res.status(400).json({msg: 'User not found'});
        }
        if(user.password !== password){

            return res.status(400).json({msg: 'Invalid password'});
        }
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({msg: 'Server Error'});
    }
}

const userRegister = async (req, res) => {

    try{
        const {email, password, name} = req.body;
        const user = await User.findOne({email, name});

        if(user){

            return res.status(400).json({msg: 'User already exists'});

        }

        const newUser = new User({email, password, name});
        await newUser.save();
        res.status(200).json({msg: 'User registered successfully'});
    }
    catch(error){
        res.status(500).json({msg: 'Server Error'});
    }
}


const forgotPassword = async (req, res) => {

    try{

        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user){

            return res.status(400).json({msg: 'User not found'});

        }

        let transporter = nodemailer.createTransport({

            service: 'gmail', // or your email service

            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD
            }

          });

          const mailOptions = {

            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Password',
            text: `Your password is: ${user.password}`

          };

          // Send email
          transporter.sendMail(mailOptions, (error, info) => {

            if (error) {

              return res.status(500).send(error);

            }

            res.status(200).send('Email sent successfully');
          });

    }

    catch(error){

        res.status(500).json({msg: 'Server Error'});
    }
}

module.exports = {

    userLogin,
    userRegister,
    forgotPassword
}
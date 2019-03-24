const user_model = require('../model/User');
const express = require('express');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
var app = express();


exports.register = async (req, res) => {
    let user = await user_model.getUser(req.body.email);
    if(user.length >= 1 ) {
        return res.status(409).json({
            message: 'User already exists'
        })
    }
    try{
        const hash = await bcrypt.hash(req.body.password, 10);
        const new_user = await user_model.createUser(req.body.name, hash, req.body.email);
        res.status(201).json({
            message: "User Registered"
        });
      
    } catch(err) {
        res.status(500).json({
            err
        });
    }
}

exports.login =  (req, res) => {
    res.render('user/dashboard');
}
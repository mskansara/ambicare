const user_model = require('../model/User');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const webpush = require("web-push");


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
        const new_user = await user_model.createUser(req.body.name, req.body.password, req.body.email);
        req.session.userId = req.body.email;
        res.redirect('/dashboard');
      
    } catch(err) {
        res.status(500).json({
            err
        });
    }
}

exports.login = async (req, res) => {
    try {
        let user = await user_model.getUser(req.body.email);
        if (user.length > 0) {
            //const result = (req.body.password, user[0].password);
            //console.log(user[0].password);
            if(req.body.password === user[0].password) {
                
                const token = await jwt.sign(
                    {
                        name: user[0].name,
                        email: user[0].email
                    },
                    process.env.JWT_KEY,
                    {
                      expiresIn: "1h"
                    }
                );
                req.session.userId = user[0].email;
                console.log(req.session.userId);

                // res.status(200).json({
                //     message: 'Authentication successfully done.',
                //     name: user[0].name,
                //     email: user[0].email,
                //     token,
                // });
                res.redirect('/dashboard');
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.status(501).json({
            err
        });
    }

}

exports.dashboard = async (req, res) => {
    if(req.session.userId === null) {
        res.render('login');  
    }
    else{
        res.render('user/dashboard');
    }  
}

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.clearCookie("session", {path: '/'});
        res.redirect("/");
    })
}


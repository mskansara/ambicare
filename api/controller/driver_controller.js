const driver_model = require('../model/Driver');
const user_model = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const webpush = require("web-push");

exports.register = async (req, res) => {
    let driver = await driver_model.getDriver(req.body.email);
    if(driver.length >= 1) {
        return res.status(409).json({
            message: 'Driver already exists.'
        });
    }
    try {
        //const hash = await bcrypt.hash(req.body.password, 10);
        const new_driver = await driver_model.createDriver(req.body.name, req.body.password, req.body.email);
        res.redirect('/driver/dashboard');
    } catch(err) {
        res.status(500).json({
            err
        })
    }
}

exports.login = async (req, res) => {
    try {
        /*let driver = await driver_model.getDriver(req.body.email);
        if (driver.length > 0) {
            //const result = (req.body.password, user[0].password);
            console.log(user[0].password);
            if(req.body.password === driver[0].password) {
                
                const token = await jwt.sign(
                    {
                        name: driver[0].name,
                        email: driver[0].email
                    },
                    process.env.JWT_KEY,
                    {
                      expiresIn: "1h"
                    }
                );
                

                // res.status(200).json({
                //     message: 'Authentication successfully done.',
                //     name: user[0].name,
                //     email: user[0].email,
                //     token,
                // });
                res.redirect('/driver/dashboard');
            } else {
                res.redirect('/driver/login');
            }
        } else {
            res.redirect('/driver/login');
        }*/
        res.redirect('/driver/dashboard');
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
        res.render('driver/dashboard');
    }  
}

exports.subscribe =  (req, res) => {
    // Get pushSubscription object
    console.log(req.body);
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = { title: 'Ambicare' };

    // Pass object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
}

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.clearCookie("session", {path: '/'});
        res.redirect("/");
    })
}

exports.booking = async (req, res) => {
    let user = await user_model.getUser(req.body.email);
    let userid = user[0].id;
    console.log(userid);
    let driver = await driver_model.getDriver(req.body.driver_email);
    let driverid = driver[0].id;
    console.log(driverid);
    let result = await driver_model.booking(userid, driverid, req.body.location, req.body.dropLocation);
    //console.log(req.body);
    res.json({
        success: true,
    });
}
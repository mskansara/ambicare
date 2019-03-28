const driver_model = require('../model/Driver');
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
        const hash = await bcrypt.hash(req.body.password, 10);
        const new_driver = await driver_model.createDriver(req.body.name, hash, req.body.email);
        res.status(201).json({
            message: "Driver Registered"
        });
    } catch(err) {
        res.status(500).json({
            err
        })
    }
}

exports.login = async (req, res) => {
    res.render('driver/dashboard');
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
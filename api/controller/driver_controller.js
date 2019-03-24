const driver_model = require('../model/Driver');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let driver = await driver_model.getDriver(req.body.email);
    if(driver.length >= 1) {
        return res.status(409).json({
            message: 'Driver already exists.'
        });
    }
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const new_driver = await driver_model.createUser(req.body.name, hash, req.body.email);
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
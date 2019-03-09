//Routers for user eg: /login, /registration
const express = require('express');
const driver_controller = require('../controller/driver_controller');
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('driver/login');
});

router.get('/register', (req,res) => {
    res.render('driver/register');
});

router.post('/login', driver_controller.login);

router.post('/register', driver_controller.register);


module.exports = router;
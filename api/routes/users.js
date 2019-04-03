//Routers for user eg: /login, /registration
const express = require('express');
const user_controller = require('../controller/user_controller');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('welcome');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.post('/login', user_controller.login);

router.post('/register', user_controller.register);

router.get('/dashboard', user_controller.dashboard);

router.get('/logout', user_controller.logout);

router.get('/view_booking', user_controller.viewBooking);

module.exports = router;
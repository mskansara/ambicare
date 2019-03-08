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

module.exports = router;
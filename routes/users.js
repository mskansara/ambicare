//Routers for user eg: /login, /registration
const express = require('express');
// const manifest = require('../manifest.json');
// const serviceworker = require('../static/service-worker.js');
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

module.exports = router;
//Routers for user eg: /login, /registration
const express = require('express');
const manifest = require('../manifest.json');
// const serviceworker = require('../static/service-worker.js/index.js');
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

router.get('/manifest.json', (req, res) => {
    res.json(manifest);
});

// router.get('/service-worker.js', (req, res) => {
//     res.type('.js');
//     res.send(serviceworker);
// });
module.exports = router;
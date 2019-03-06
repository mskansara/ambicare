//Routers for user eg: /login, /registration
const express = require('express');
const router = express.Router();


router.get('/login', (req, res) => {
    res.send('Login Page');
});

router.get('/register', (req,res) => {
    res.send('Registration Page');
});


module.exports = router;
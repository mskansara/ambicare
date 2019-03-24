const express = require('express');
const http = require('http').Server(express);
const path = require('path');
const exphbs = require('express-handlebars');

var bodyParser = require('body-parser');

//Initializing express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
//Port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
app.use('/static',express.static('static'));

var io = require('socket.io').listen(server);

//Handlebars middleware 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Routes 
app.use('/', require('./api/routes/users'));
app.use('/driver', require('./api/routes/driver'));

//Socket Connection
io.on('connection', (socket) => {
    socket.on('location', (data) => {
        io.emit('location', data);
    });
});
io.on('user_details', (socket) => {
    socket.on('user_details', (data) => {
        io.emit('user_details', data);
    });
});


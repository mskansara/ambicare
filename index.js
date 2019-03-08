const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

//Initializing express
const app = express();

app.use('/static',express.static('static'));

//Handlebars middleware 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Routes 
app.use('/', require('./api/routes/users'));
app.use('/driver', require('./api/routes/users'));



//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
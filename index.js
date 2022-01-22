//initialize and configure expreess
//initialize templating lib
// create controller
//bind routing
//create layout
//create data service
//inplement controllers
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const cubeService = require('./services/cubes.js');
const { about } = require('./controllers/about.js');
const { create } = require('./controllers/create.js');
const { details } = require('./controllers/details.js');
const { home } = require('./controllers/home.js');
app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', 'hbs');


app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));
app.use(cubeService());

app.get('/', home);
app.get('/create', create);
app.get('/about', about);
app.get('/details/:id', details);
//put the 404 page? app.all('*', notFound);

app.listen(3000, () => console.log(`Listening on port 3000...`));
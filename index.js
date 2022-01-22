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
const { home } = require('./controllers/home.js');
const { about } = require('./controllers/about.js');
const create = require('./controllers/create.js');
const { details } = require('./controllers/details.js');
const { notFound } = require('./controllers/notFound.js');
const deleteCube = require('./controllers/delete.js');
const edit = require('./controllers/edit.js');

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', 'hbs');


app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));
app.use(cubeService());

app.get('/', home);
app.get('/about', about);
app.get('/details/:id', details);
app.route('/create')
    .get(create.get)
    .post(create.post);

app.route('/delete/:id')
    .get(deleteCube.get)
    .post(deleteCube.post);

app.route('/edit/:id')
    .get(edit.get)
    .post(edit.post);

app.all('*', notFound);


app.listen(3000, () => console.log(`Listening on port 3000...`));
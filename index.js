const express = require('express');
const hbs = require('express-handlebars');
const initDB = require('./models/index');
const cubeService = require('./services/cubes.js');
const accessoryService = require('./services/accessory.js');
const { home } = require('./controllers/home.js');
const { about } = require('./controllers/about.js');
const create = require('./controllers/create.js');
const { details } = require('./controllers/details.js');
const { notFound } = require('./controllers/notFound.js');
const deleteCube = require('./controllers/delete.js');
const edit = require('./controllers/edit.js');
const accessory = require('./controllers/accessory.js');

async function start() {
    await initDB();
    const app = express();
    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');
    
    
    app.use(express.urlencoded({extended: true}));
    app.use('/static', express.static('static'));
    app.use(cubeService());
    app.use(accessoryService());
    
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
    
    app.route('/accessory')
        .get(accessory.get)
        .post(accessory.post);
    
    app.route('/attach/:id')
        .get(accessory.get)
        .post(accessory.post);
    
    app.all('*', notFound);
    app.listen(3000, () => console.log(`Listening on port 3000...`));
}

start();




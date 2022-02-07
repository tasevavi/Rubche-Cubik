const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const initDB = require('./models/index');

const cubeService = require('./services/cubes.js');
const accessoryService = require('./services/accessory.js');
const authService = require('./services/authService.js');

const { home } = require('./controllers/home.js');
const { about } = require('./controllers/about.js');
const create = require('./controllers/create.js');
const { details } = require('./controllers/details.js');
const { notFound } = require('./controllers/notFound.js');
const deleteCube = require('./controllers/delete.js');
const edit = require('./controllers/edit.js');
const accessory = require('./controllers/accessory.js');
const attach = require('./controllers/attach.js');
const {registerGet, registerPost, loginGet, loginPost, logout} = require('./controllers/auth.js');

const { isLoggedIn } = require('./services/util.js');

async function start() {
    await initDB();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');
    
    app.use(session({
        secret: 'rubick cube hobby', 
        resave: false, 
        saveUninitialized: true, 
        cookie: { secure: 'auto'} //so it works in http
    }));
    app.use(express.urlencoded({extended: true}));
    app.use('/static', express.static('static'));
    app.use(cubeService());
    app.use(accessoryService());
    app.use(authService());
    
    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);
    
    app.route('/create')
        .get(isLoggedIn(), create.get)
        .post(isLoggedIn(), create.post);
    
    app.route('/delete/:id')
        .get(isLoggedIn(), deleteCube.get)
        .post(isLoggedIn(), deleteCube.post);
    
    app.route('/edit/:id')
        .get(isLoggedIn(), edit.get)
        .post(isLoggedIn(), edit.post);
    
    app.route('/accessory')
        .get(isLoggedIn(), accessory.get)
        .post(isLoggedIn(), accessory.post);
    
    app.route('/attach/:id')
        .get(isLoggedIn(), attach.get)
        .post(isLoggedIn(), attach.post);

    app.route('/register')
        .get(registerGet)
        .post(registerPost);

    app.route('/login')
        .get(loginGet)
        .post(loginPost);
    
    app.get('/logout', logout);

    app.all('*', notFound);
    app.listen(3000, () => console.log(`Listening on port 3000...`));
}

start();




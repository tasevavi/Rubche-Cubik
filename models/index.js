//initialize database = with mongoose they are global
const mongoose = require('mongoose');
const Cube = require('./Cube');
const Accessory = require('./Accessory');
const connectionString = 'mongodb://localhost:27017/cubes';

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log('>>>> Database started');
        mongoose.connection.on('error', (err) => {
            console.error('Database error');
        });
    } catch (err) {
        console.error('Error connection to database');
        process.exit(1);
    }
}

module.exports = init;

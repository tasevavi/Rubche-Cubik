const { Schema, model } = require('mongoose');

const cubeSchema = new Schema({
    name: {type: String, required: true}, 
    description: {type: String, required: true}, 
    imageUrl: {type: String, required: true}, 
    price: {type: Number, required: true, min: 0}
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;

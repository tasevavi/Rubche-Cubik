const { Schema, model } = require('mongoose');
const cubeSchema = new Schema({
    name: {type: String, required: true}, 
    description: {type: String, required: true}, 
    imageUrl: {type: String, required: true}, 
    price: {type: Number, required: true}
});

const cube = model('Cube', cubeSchema);

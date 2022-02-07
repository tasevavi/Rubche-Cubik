const { Schema, model, Types: {ObjectId} } = require('mongoose');

const cubeSchema = new Schema({
    name: {type: String, required: true, minlength: 3}, 
    description: {type: String, required: true}, 
    imageUrl: {type: String, required: true}, 
    price: {type: Number, required: true, min: 0}, 
    accessories: { type: [ObjectId], default: [], ref: 'Accessory'},
    owner: { type: ObjectId, ref: 'User'}
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;

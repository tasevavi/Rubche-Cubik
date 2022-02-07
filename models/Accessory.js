const { Schema, model, Types: { ObjectId } } = require('mongoose');

const accessorySchema = new Schema({
    name: {type: String, required: true},
    descriprion: {type: String}, 
    imageUrl: {type: String, required: true}, 
    price: {type: Number, required: true}, 
    owner: {type: ObjectId, ref: 'User'}
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;
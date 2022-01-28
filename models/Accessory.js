const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true},
    descriprion: { type: String, required: true}, 
    imageUrl: {type: String, required: true}, 
    price: {type: Number, required: true}
});

const Accessory = model ('Accessory', accessorySchema);

module.exports = Accessory;
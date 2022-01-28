const Accessory = require('../models/Accessory');

async function createAccessory(accessory) {
    await Accessory.create(accessory);
}


const Accessory = require('../models/Accessory');

async function getAll() {

}

async function createAccessory(accessory) {
    await Accessory.create(accessory);
}

module.exports = () => (req, res, next) => {
    req.accessory = {
        createAccessory
    };

    next();
}
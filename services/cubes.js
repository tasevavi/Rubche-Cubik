const Cube = require('../models/Cube.js');
const { cubeViewModel } = require('./util.js');

async function getAll(query) {
    const options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        options.price = { $gte: Number(query.from)};
    }
    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price.$lte = Number(query.to);
    }

    const cubes = await Cube.find(options); //or lean()
    return cubes.map(cubeViewModel);
}

async function getById(id) {
    const cube = await Cube.findById(id).populate('accessories');
    if (cube) {
        return cubeViewModel(cube);
    } else {
        return undefined;
    }
}

async function createCube(cube) {
    const result = new Cube(cube);
    await result.save();
}

async function deleteById(id) {
   await Cube.findByIdAndDelete(id);
}

async function updateById(id, cube) {
    const existing = await Cube.findById(id);
    existing.name = cube.name;
    existing.description = cube.description;
    existing.imageUrl = cube.imageUrl;
    existing.price = cube.price;
    existing.accessories = cube.accessories;
    existing.owner = cube.owner; //new thing
    await existing.save();
}

async function attachAccessory(cubeId, accessoryId) {
    const existing = await Cube.findById(cubeId);
    existing.accessories.push(accessoryId);
    await existing.save();
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll, 
        getById, 
        createCube, 
        deleteById, 
        updateById, 
        attachAccessory
    };
    next();
};
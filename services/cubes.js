const Cube = require('../models/Cube.js');

function cubeViewModel(cube) {
    return {
        id: cube._id, 
        name: cube.name, 
        description: cube.description, 
        imageUrl: cube.imageUrl, 
        price: cube.price
    }
}

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
    const cube = await Cube.findById(id);
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
    await existing.save();
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll, 
        getById, 
        createCube, 
        deleteById, 
        updateById
    };
    next();
};
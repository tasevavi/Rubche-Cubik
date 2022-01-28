const fs = require('fs').promises;
const Cube = require('../models/Cube.js');

async function read() {
    try {
        const file = await fs.readFile('./services/data.json');
        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1)
    }
}

function cubeViewModel(cube) {
    return {
        id: cube._id, 
        name: cube.name, 
        description: cube.description, 
        imageUrl: cube.imageUrl, 
        price: cube.price
    }
}

async function write(data) {
    try {
        const file = await fs.writeFile('./services/data.json', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1)
    }
}

async function getAll(query) {
    const cubes = await Cube.find({}); //or lean()
    return cubes.map(cube => cubeViewModel(cube));
    // const data = await read();
    // let cubes = Object
    //     .entries(data)
    //     .map(([id, v]) => Object.assign({}, {id}, v));

    // if (query.search) {
    //     cubes = cubes.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    // }

    // if (query.from) {
    //     cubes = cubes.filter(c => c.price >= Number(query.from));
    // }

    // if (query.to) {
    //     cubes = cubes.filter(c => c.price <= Number(query.to));
    // }

    // return cubes;
}

async function getById(id) {
    const cube = await Cube.findById(id);
    if (cube) {
        return cubeViewModel(cube);
    } else {
        return undefined;
    }
    // const data = await read();
    // const cube = data[id];

    // if (cube) {
    //     return Object.assign({}, {id}, cube);
    // } else {
    //     return undefined;
    // }
}

async function createCube(cube) {
    const cubes = await read();
    let id = nextId();
    cubes[id] = cube;
    await write(cubes);
}

async function deleteById(id) {
    const data = await read();
    
    if (data.hasOwnProperty(id)) {
        delete data[id];
        await write(data);
    } else {
        throw new ReferenceError('No such ID in database');
    }
}

async function updateById(id, cube) {
    const data = await read();

    if (data.hasOwnProperty(id)) {
        data[id] = cube;
        await write(data);
    } else {
        throw new ReferenceError('No such ID in database');
    }
}

function nextId() {
    return 'xxxxxx-xxxx'.replace(/x/g, () => (Math.random()*16 | 0).toString(16));
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
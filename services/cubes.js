const fs = require('fs').promises;

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

async function write(data) {
    try {
        await fs.writeFile('./services/data.json', JSON.stringify(data));
        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1)
    }
}

async function getAll() {
    const data = await read();
    return Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, {id}, v));
}

async function getById(id) {
    const data = await read();
    const cube = data[id];

    if (cube) {
        return Object.assign({}, {id}, cube);
    } else {
        return undefined;
    }
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll, 
        getById
    };
    next();
};
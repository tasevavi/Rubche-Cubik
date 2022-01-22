module.exports = {
    async home(req, res) {
        const cubes = await req.storage.getAll();
        res.render('index', {cubes, title: 'Home'});
    }
};
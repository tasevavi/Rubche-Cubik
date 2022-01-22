module.exports = {
    async home(req, res) {
        const cubes = await req.storage.getAll(req.query);
        res.render('index', {cubes, title: 'Home', query: req.query});
    }
};
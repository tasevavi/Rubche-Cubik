module.exports = {
    async home(req, res) {
        const cubes = await req.storage.getAll(req.query);
        //console.log('>>> cubes from storage.getAll', cubes);//undefined
        res.render('index', {cubes, title: 'Home', query: req.query});
    }
};
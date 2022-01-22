module.exports = {
    get(req, res) {
        res.render('create', {title: 'Add Cube'});
    }, 
    post(req, res) {
        const cube = {
            name: req.body.name, 
            description: req.body.description, 
            imageUrl: req.body.imageUrl, 
            difficulty: req.body.difficulty
        };

        req.storage.createCube(cube);
        res.redirect('/');
    }
};
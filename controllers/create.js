module.exports = {
    get(req, res) {
        res.render('create', {title: 'Add Cube'});
    }, 
    async post(req, res) {
        const cube = {
            name: req.body.name, 
            description: req.body.description, 
            imageUrl: req.body.imageUrl, 
            price: Number(req.body.price),
            owner: req.session.user.id
        };

        try {
            await req.storage.createCube(cube);
            res.redirect('/');
        } catch (err) {
            console.log('Error creating record');
            res.redirect('/create');
        }
    }
};
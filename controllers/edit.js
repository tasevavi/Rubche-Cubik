module.exports = {
    get(req, res) {
        const id = req.params.id;
        const cube = await req.storage.getById(id);

        if (cube) {
            res.render('update', {title: 'Edit Cube'}, cube); 
        } else {
            res.redirect('/404');
        }
    }, 
    async post(req, res) {
        const id = req.params.id;
        const cube = {
            name: req.body.name, 
            description: req.body.description, 
            imageUrl: req.body.imageUrl, 
            price: Number(req.body.price)
        };

        try {
            await req.storage.updateById(id, cube);
            res.redirect('/');  
        } catch (err) {
            res.redirect('/404');
        }
    }
};
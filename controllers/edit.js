module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const cube = await req.storage.getById(id);

        if (cube.owner != req.session.user.id) {
            console.log('>>>>>User is not owner<<<<<');
            return res.redirect('/login');
        } 
        if (cube) {
            res.render('edit', {title: 'Edit Cube', cube}); 
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
            res.redirect(`/details/${id}`);  
        } catch (err) {
            res.redirect('/404');
        }
    }
};
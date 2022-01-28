module.exports = {
    async get (req, res) {
        const id = req.params.id;
        try {
            const [cube, accessories] = await Promise.all([
                req.storage.getById(id), 
                req.accessory.getAll()
            ]);
            res.render('accessories/attachAccessory', {title: 'Attach Accessory', cube, accessories});
        } catch (err) {
            res.redirect('/404');
        }
    }, 

    async post(req, res) {
        res.redirect('/');
    }
}
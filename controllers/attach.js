module.exports = {
    async get (req, res) {
        const id = req.params.id;
        try {
            const cube = await req.storage.getById(id);
            res.render('accessories/attachAccessory', {title: 'Attach Accessory', cube});
        } catch (err) {
            res.redirect('/404');
        }
    }, 

    async post(req, res) {
        res.redirect('/');
    }
}
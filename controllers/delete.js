module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const cube = await req.storage.getById(id);

        if (cube) {
            res.render('delete', {title: `Delete cube - ${cube.name}`,cube});
        } else {
            res.redirect('/404');
        }
    },
    async post(req, res) {
        const id = req.params.id;

        try {
            await req.storage.deleteById(id);
            res.redirect('/');
        } catch(err) {
            res.redirect('/404');
        }
    }
}
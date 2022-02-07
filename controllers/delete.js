module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const cube = await req.storage.getById(id);

        if (car.owner != req.session.user.id) {
            console.log('>>>>>User is not owner<<<<<<');
            return res.redirect('/login');
        }

        if (cube) {
            res.render('delete', {title: `Delete cube - ${cube.name}`,cube});
        } else {
            res.redirect('/404');
        }
    },
    async post(req, res) {
        const id = req.params.id;

        try {
            const deletedOK = await req.storage.deleteById(id, req.session.user.id);
            if (deletedOK) {
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        } catch(err) {
            res.redirect('/404');
        }
    }
}
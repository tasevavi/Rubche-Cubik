module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const cube = await req.storage.getById(id);
        if (req.session.user && req.session.user.id == cube.owner) {
            res.locals.isOwner = true;
        }
        
        if (cube) {
            res.render('details', {title: 'Details', cube});
        } else {
            res.redirect('/404')
        }
    }
};
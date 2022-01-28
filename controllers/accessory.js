module.exports = {
    get (req, res) {
        res.render('accessories/createAccessory', {title: 'Create Accessory'});
    }, 
    post (req, res) {
        
        res.redirect('/');
    }
}
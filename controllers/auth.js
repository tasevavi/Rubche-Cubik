module.exports = {
    registerGet(req, res) {
        res.render('register', { title: 'Register'});
    }, 
    registerPost(req, res) {
        
        res.redirect('/');
    }, 
    loginGet(req, res) {

    }, 
    loginPost(req, res) {

    }, 
    logoutGet(req, res) {

    }
}
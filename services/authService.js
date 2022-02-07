const User = require('../models/User');

async function register(username, password) {
    const user = new User({
        username, 
        hashedPassword: password
    });
    await user.save();
}

//this will login the user and redirect but wont put anything in the session
async function login(username, password) {
    const user = await User.findOne({username}); 
    if (!user) {
        throw new Error('Invalid username or password');
    } else {
        const result = await user.comparePassword(password);
        if(result) {
            return true;
        } else {
            throw new Error('Invalid username or password');
        }
    }
}

module.exports = () => (req, res, next) => {
    req.auth = {
        register,
        login
    };
    next();
};
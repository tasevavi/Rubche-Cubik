const { Schema, model } = require('mongoose');
const { comparePassword, hashPassword } = require('../services/util.js');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 3, unique: true}, 
    hashedPassword: { type: String, required: true}
});

userSchema.methods.comparePassword = async function(password) {
    // Hash incoming password and compare incoming password with hashed pass
    return await comparePassword(password, this.hashedPassword);
};

//hash before saving and only if it was changed -> first time it will return true for isModified
userSchema.pre('save', async function(next){
    if (this.isModified('hashedPassword')) {
        this.hashedPassword = await hashPassword(this.hashedPassword);
    }

    next();
});

const User = model('User', userSchema);

module.exports = User;
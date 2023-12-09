const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'user'}
})

const Users = mongoose.model('Users', schema);
module.exports = Users;
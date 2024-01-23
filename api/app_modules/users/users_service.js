const dbConnect = require("../../services/dbConnect");
const mongoose = require("mongoose");
const User = require('./users_model');

async function save(user) {
    await dbConnect();

    const collection = mongoose.model('users');

    const username = 'user' + new Date().getTime()
    console.log({username})

    const result = await collection.create({
        email: user.email,
        password: user.password,
        username: username,
        role: 'user'
    })

    return result
}

async function getAllUsers() {
    await dbConnect();
    const collection = mongoose.model('users');

    const users = await collection.find({})
    return users
}

async function deleteAllUsers() {
    await dbConnect();
    const collection = mongoose.model('users');

    const users = await collection.deleteMany({})

}

async function getUserByEmailAndPassword(user) {
    await dbConnect();
    const collection = mongoose.model('users');

    const doc = await collection.findOne({email: user.email, password: user.password})
    return doc
}

async function getUserById(_id) {
    await dbConnect();
    const collection = mongoose.model('users');
    const user = await collection.findOne({_id: _id});
    return user
}

async function updateUser(user) {
    await dbConnect();
    const collection = mongoose.model('users');
    const doc = await collection.findOne({_id: user._id});

    doc['username'] = user.username

    console.log(doc)

    await doc.save()
    return doc
}

async function getUserByEmail(email) {
    await dbConnect();
    const collection = mongoose.model('users');
    const user = await collection.findOne({email: email});
    return user
}


module.exports = {save, getAllUsers, deleteAllUsers, getUserByEmailAndPassword, getUserById, updateUser, getUserByEmail}
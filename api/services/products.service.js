const dbConnect = require('./dbConnect');
const mongoose = require('mongoose');
const {Data} = require("../data");
const modelName = 'products'

async function databaseAction(action, ...args) {
    await dbConnect();
    return mongoose.model(modelName)[action](...args);
}

// async function save(request) {
//     console.log(request.modelName)
//     await dbConnect();
//     // return mongoose.model(`${request.modelName}`, request.name);
//     return mongoose.model(request.modelName, request.name).create();
// }

async function save(request) {
    await dbConnect();
    const collection = mongoose.model(request.modelName);
    await collection.create({
        name: request.name
    });
}

async function update(request) {
    await databaseAction('findOneAndUpdate', { id: request.id }, request);
}

async function getAll(modelName) {
    console.log(modelName)
    await dbConnect();
    return mongoose.model(modelName).find({});
}
async function getAllProducts() {
    await dbConnect();
    return  mongoose.model('products').find({}).limit(15);
}
async function getAllFormBuilderGroup() {
    const data = Data
    // const modelData = ModelData
    // console.log(modelData.Products)
    return 'data';
}
// async function getMaxId() {
//     await dbConnect();
//     const collection = mongoose.model(modelName);
//     const data = await collection.find({}, { id: 1, _id: 0 });
//     const array = [];
//     data.map((obj) => {
//         array.push(obj.id);
//     });
//     return Math.max(...array);
// }
async function getMaxId() {
    await dbConnect();
    const collection = mongoose.model(modelName);
    const pipeline = [
        { $group: { _id: null, maxId: { $max: '$id' } } },
        { $project: { _id: 0, maxId: 1 } }
    ];
    const [{ maxId }] = await collection.aggregate(pipeline).exec().toArray();
    return maxId;
}

module.exports = {
    save,
    getAll,
    getAllProducts,
    getAllFormBuilderGroup,
    getMaxId,
    update,
};

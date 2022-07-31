const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true}, // required: true - обязательно для заполнения, unique: true - уникальный
    password: {type: String, required: true},
    links: [{ type: Types.ObjectId, ref: 'Link'}]
});

module.exports = model('User', schema)
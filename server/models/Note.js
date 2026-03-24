const { Schema, model } = require('mongoose');

const noteModel = new Schema({
    date: {
        type: Date,
        default: new Date,
        required: true
    },
    title: {
        type: String,
        required: true,
        default: ""
    },
    content: {
        type: String,
        required: true,
        default: ""
    }
})

module.exports = model('noteModel', noteModel);
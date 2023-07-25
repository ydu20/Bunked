const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatsSchema = new Schema({

    sourceEmail: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },

    targetEmail: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },

    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },

    timeStamp: {
        type: Date,
        required: true,
    }
    
})
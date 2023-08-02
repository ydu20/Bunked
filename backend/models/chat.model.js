const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({

    chatID: {
        type: String,
        required: true,
        minlength: 5,
    },

    senderEmail: {
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
    
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
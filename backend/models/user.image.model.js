const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userImageSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
    },
    index: {
        type: Number,
        required: true,
    },
    filename: {
        type: String,
        required: true,
        minlength: 5,
    }
})

const UserImage = mongoose.model('UserImage', userImageSchema);

module.exports = UserImage;
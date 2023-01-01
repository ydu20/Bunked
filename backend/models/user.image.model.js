const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userImageSchema = new Schema ({
    email: {
        type: String,
        required: true,
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
});

userImageSchema.index({ email: 1, index: 1}, { unique: true });

const UserImage = mongoose.model('UserImage', userImageSchema);

module.exports = UserImage;
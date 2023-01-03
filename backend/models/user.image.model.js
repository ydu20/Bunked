const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userImageSchema = new Schema ({
    email: {
        type: String,
        required: true,
        minlength: 5,
    },
    files: {
        type: [String],
        required: true,
    }
});

const UserImage = mongoose.model('UserImage', userImageSchema);

module.exports = UserImage;
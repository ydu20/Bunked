const User = require('../models/user.model');
const UserImage = require('../models/user.image.model');
const fs = require('fs');

var deleteFiles = (files) => {
    files.forEach(x => {
        fs.unlink(x.destination + '/' + x.filename, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(x.filename + " deleted.");
            }
        });
    });
}

exports.uploadImage = async (req, res) => {
    // Check if user exsits
    var exists;
    
    if (req.body.email) {
        exists = await User.findOne({
            email: req.body.email,
        });
    }

    if (!exists) {
        deleteFiles(req.files);

        return res.status(400)
            .json('Error: user not found');
    }

    // Check for image table
    const images = await UserImage.findOne({email: req.body.email}).exec();
    
    if (images && req.files.length + images.files.length > 3) {

        deleteFiles(req.files);

        return res.status(400)
            .json('Error: at most 9 pictures can be added for each User');
    }

    if (images) {
        const filter = {email: images.email};

        var update = {
            files: [... images.files, ... req.files.map(x => x.filename)],
        }
        console.log(update);

        UserImage.findOneAndUpdate(filter, update)
            .then(() => res.json('Images uploaded!'))
            .catch(err => res.status(400).json("Error: " + err));

    } else {
        var newImg = new UserImage ({
            email: req.body.email,
            files: req.files.map(x => x.filename),
        });

        newImg.save()
            .then(() => res.json('Images uploaded!'))
            .catch(err => res.status(400).json('Error' + err));
    }
}

exports.getImage = async (req, res) => {
    console.log(req.query);
    if (!req.query.email || !req.query.index || isNaN(req.query.index)) {
        return res.status(400).json('Schema error');
    }

    // Find userImg item
    var img = await UserImage.findOne({email: req.query.email});

    // Return image in specific index
    if (img && img.files.length > req.query.index && req.query.index >= 0) {
        console.log(img);
        var path = './profile-pics/' + img.files[req.query.index];
        
        if (fs.existsSync(path)) {
            // file exists
            res.sendFile(img.files[req.query.index], { root: './profile-pics/' });
        } else {                
            // Delete from table anyways
            deleteImgFromTable(img, req.query.index, null);

            res.status(400).json('Picture not found');
        }

    } else {
        return res.status(400).json('Picture not found');
    }
}

exports.deleteImage = async (req, res) => {
    if (!req.query.email || !req.query.index || isNaN(req.query.index)) {
        return res.status(400).json('Schema error');
    }

    var img = await UserImage.findOne({email: req.query.email});

    if (img && img.files.length > req.query.index && req.query.index >= 0) {
        
        var fileName = img.files[req.query.index];

        fs.unlink('./profile-pics/' + fileName, (err) => {});

        deleteImgFromTable(img, req.query.index, res);
        return;
    } else {
        return res.status(400).json('Picture not found');
    }
}

var deleteImgFromTable = (userImg, index, res) => {
    var files = userImg.files;
    files.splice(index, 1);
    const filter = {email: userImg.email};
    const update = {files};

    UserImage.findOneAndUpdate(filter, update)
        .then(() => res?.json('Image deleted!'))
        .catch(err => res?.status(400).json("Error: " + err));
}
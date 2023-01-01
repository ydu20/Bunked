let User = require('../models/user.model');
let UserImage = require('../models/user.image.model');
const fs = require('fs');

deleteFiles = (files) => {
    files.forEach(x => {
        console.log(x);
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
    const images = await UserImage.find({email: req.body.email}).exec();
    
    console.log(images);

    if (req.files.length + images.length > 2) {

        deleteFiles(req.files);

        return res.status(400)
            .json('Error: at most 9 pictures can be added for each User');
    }

    // insert into image table
    Promise.all(req.files.map((x, ind) => {
        const newImg = new UserImage ({
            email: req.body.email,
            index: images.length + ind,
            filename: x.filename
        });

        return newImg.save();
    })).then(() => {
        return res.json("Images uploaded!");
    }).catch(err => {
        console.log(err);
        return res.status(400).json('Error:' + err);
    })
    
}

exports.getImage = async (req, res) => {
    if (!req.query.email || !req.query.index || isNaN(req.query.index)) {
        return res.status(400).json('Schema error');
    }

    var img = await UserImage.findOne({email: req.query.email, index: req.query.index});

    if (img) {
        console.log(img);
        var path = './profile-pics/' + img.filename;
        try {
            if (fs.existsSync(path)) {
                // file exists
                res.sendFile(img.filename , { root: './profile-pics/' });
            } else {
                res.status(400).json('Error sending picture');
                
                // TODO: code to delete from table

            }
          } catch(err) {
            return res.status(400).json('Error sending picture');
          }
    } else {
        return res.status(400).json('Picture not found');
    }
}

exports.deleteImage = async (req, res) => {

}
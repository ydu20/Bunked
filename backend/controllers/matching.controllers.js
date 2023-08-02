const Matching = require('../models/matching.model');
const UserImage = require('../models/user.image.model');
const fs = require('fs');
const User = require('../models/user.model');


exports.createMatching = async (req, res) => {
    const userA = req.body.userA.toLowerCase();
    const userB = req.body.userB.toLowerCase();
    const chatID = req.body.id;


    const matching = new Matching({
        userA: userA,
        userB: userB,
        chatID: chatID,
    })

    matching.save().then(() => {
        res.json({success: 'Matching created!'});
    }).catch(err => {
        res.status(400).json('Error: ' + err)
    });
}

exports.getMatchings = async (req, res) => {
    const email = req.query.email.toLowerCase();

    Matching.find({
        $or: [
            {userA: email}, 
            {userB: email},
        ]
    }).then(entries => {
        // Get picture
        const promises = entries.map(entry => (new Promise((resolve, reject) => {
            UserImage.findOne(
                {email: entry.userA === email ? entry.userB : entry.userA}
            ).then(
                img => {
                    if (img && img.files.length > 0) {
                        var path = './profile-pics/' + img.files[0];
                        if (fs.existsSync(path)) {

                            fs.readFile(path, (err, data) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    const base64Image = Buffer.from(data).toString('base64');
                                    
                                    resolve({
                                        userA: entry.userA,
                                        userB: entry.userB,
                                        img: base64Image,
                                        chatID: entry.chatID,
                                    })
                                }
                            })
                        }
                    }
                }
            ).catch(err => reject(err));
        })));
        
        return Promise.all(promises);

    }).then(entrieswithPictures => {
        // Get first name
        const promises = entrieswithPictures.map(entry => (new Promise((resolve, reject) => {
            User.findOne(
                {email: entry.userA === email ? entry.userB : entry.userA}
            ).then( user => {
                resolve({
                    userA: entry.userA,
                    userB: entry.userB,
                    img: entry.img,
                    chatID: entry.chatID,
                    matchName: user.name,
                });
            }).catch(err => reject(err));
        })));
        
        return Promise.all(promises);
        
    }).then(results => {
        res.status(200).json(results);
    }).catch(err => {
        res.status(400).json('Error: ' + err);
    });
}
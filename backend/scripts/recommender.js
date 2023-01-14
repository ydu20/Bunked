const tf = require("@tensorflow/tfjs");
const User = require("../models/user.model");
const UserBio = require("../models/user.bio.model");
const Action = require("../models/action.model");
const { kdTree } = require("kd-tree-javascript");
const cosinedist = require("./cosinedist");


// Given model and array of text, return array of arrays embedded by the model
const embed = async (model, textArray) => {
    const embeddingsTensors = (await model.embed(textArray));
    const embeddings = embeddingsTensors.arraySync();
    return embeddings;
}

// Helper method to define 'distance' between two users
// Using L1 distance for each field except for hobbies
// Input: 2 user objects
// Output: 'distance' between the users
const dist = (a, b) => {

    let sleepstartdiff = Math.abs(a.sleep.start - b.sleep.start);

    // Adjust the sleep times
    if (a.sleep.start > 18 && b.sleep.start < 18) {
        sleepstartdiff = Math.abs(b.sleep.start + 24 - a.sleep.start);
    } else if (a.sleep.start < 18 && b.sleep.start > 18) {
        sleepstartdiff = Math.abs(a.sleep.start + 24 - b.sleep.start);
    }

    // Weights on how important each field is can be changed
    let dist = Math.abs(a.extroversion - b.extroversion) + Math.abs(a.cleanliness - b.cleanliness) + Math.abs(a.noise - b.noise) + Math.abs(a.drink - b.drink) + Math.abs(a.greek - b.greek) + Math.abs(a.guests - b.guests) + ((sleepstartdiff+ Math.abs(a.sleep.end - b.sleep.end)) / 5) + Math.abs(a.smoke - b.smoke);
    
    // Pick the 2 most similar hobbies distance
    if (!a.hobbies_encoded || !b.hobbies_encoded || a.hobbies_encoded.length == 0 || b.hobbies.length == 0) {
        dist = dist + 3 + 3; // Each missing hobby will add 3
    } else if (a.hobbies_encoded.length == 1 && b.hobbies_encoded.length == 1) {
        dist = dist + (cosinedist(a.hobbies_encoded[0], b.hobbies_encoded[0])*5) + 3;
    } else if (a.hobbies_encoded.length == 1) {
        let mindist = 100;
        for (let i = 0; i < b.hobbies_encoded.length; i++) {
            let thisdist = cosinedist(a.hobbies_encoded[0], b.hobbies_encoded[i]);
            if (thisdist < mindist) {
                mindist = thisdist;
            }
        }
        dist = dist + mindist + 3;
    } else if (b.hobbies_encoded.length == 1) {
        let mindist = 100;
        for (let i = 0; i < a.hobbies_encoded.length; i++) {
            let thisdist = cosinedist(b.hobbies_encoded[0], a.hobbies_encoded[i]);
            if (thisdist < mindist) {
                mindist = thisdist;
            }
        }
        dist = dist + (mindist*5) + 3;
    } else {
        let min1 = 100;
        let min2 = 100;
        for (let i = 0; i < a.hobbies_encoded.length; i++) {
            for (let j = 0; j < b.hobbies_encoded.length; j++) {
                let thisdist = cosinedist(a.hobbies_encoded[i], b.hobbies_encoded[j]);
                if (thisdist < min1) {
                    min2 = min1;
                    min1 = thisdist;
                } else if (thisdist < min2) {
                    min2 = thisdist;
                }
            }
        }
        dist = dist + (min1*5) + (min2*5); // Scale each cosine dist by 5 so that the distance would be a number from 0 to 5
    }

    return dist;
}

// Find k nearest people to given user email out of a subset of all users.
const findNearest = async (baseuser, k) => {
    
    // Randomly get a subset (of about 0.6, reduce this number as num users gets larger) of the users
    const users = await UserBio.find({$expr: {$lt: [0.75, {$rand: {}}]}});

    // Make sure only recommends users that have not been actioned already
    const pairings = await Action.find({baseUserEmail: baseuser.email});
    const actionedUsersEmails = new Set();
    pairings.map(pairing => actionedUsersEmails.add(pairing.targetUserEmail));
 
    const usersNew = users.filter(user => !actionedUsersEmails.has(user.email));

    // Initialize tree
    const criterion = ["extroversion", "cleanliness", "noise", "drink", "greek", "guests", "sleep", "smoke", "hobbies"];
    const tree = new kdTree(usersNew, dist, criterion);

    // Get the k nearest people
    const nearest = tree.nearest(baseuser, k);

    return nearest;
}

module.exports = {
    embed,
    findNearest
}
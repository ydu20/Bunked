const tf = require("@tensorflow/tfjs");

const embed = async (model, textArray) => {
    const embeddingsTensors = (await model.embed(textArray));
    const embeddings = embeddingsTensors.arraySync();
    return embeddings;
}

module.exports = {
    embed
}
// Method to define the cosine distance between two arrays. Calculated using a modified version of this function https://www.learndatasci.com/glossary/cosine-similarity/
// Input: 2 arrays of the same distance
// Output: Cosine distance, a value between 0 and 1. 0 being the most similar (vectors in the same direction), and 1 being the least similar (vectors in opposite directions)
const cosinedist = (a, b) => {
    if (a.length != b.length) {
        console.log('Arrays must be same length');
        process.exit(1);
    }

    let dotProd = 0;
    let magA = 0;
    let magB = 0;

    for (let i = 0; i < a.length; i++) { // Iteration slow :(, miss python
        dotProd = dotProd + (a[i] * b[i]); // Calculate a dot b
        magA = magA + (a[i] * a[i]); // Calculate magnitude of a
        magB = magB + (b[i] + b[i]); // Calculate magnitude of b
    }
    magA = Math.sqrt(magA);
    magB = Math.sqrt(magB);

    const similarity = dotProd / (magA * magB);

    // Convert similarity to a distance measure
    const distance = (-1 * similarity + 1) / 2;

    return distance;
}

module.exports = cosinedist;
import vectorNorm from "./vectorNorm.js";

const vectorSum = (vector1, vector2) => {
    const result = vector1.map((e,i) => e + vector2[i]);
    const len = vectorNorm(result);
    return result.map((e) => e/len);
}

export default vectorSum;
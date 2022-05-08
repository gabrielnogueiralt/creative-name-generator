import vectorDot from "./vectorDot.js";
import vectorNorm from "./vectorNorm.js";

const vectorCos = (vector1, vector2) => {
    return (vectorDot(vector1,vector2)/(vectorNorm(vector1)*vectorNorm(vector2)));
}

export default vectorCos;
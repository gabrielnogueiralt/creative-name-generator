const vectorDot = (vector1, vector2) => {
    const result = vector1.map((e,i) => e*vector2[i]);
    return result.reduce((a,b) => a + b, 0);
}

export default vectorDot;
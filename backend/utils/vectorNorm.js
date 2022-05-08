const vectorNorm = (vector) => {
    var sum = 0;
    for(const value of vector){
        sum += value**2;
    }
    return Math.sqrt(sum);
}

export default vectorNorm;
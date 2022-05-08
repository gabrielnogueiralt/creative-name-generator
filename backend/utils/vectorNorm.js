const vectorNorm = (vector) => {
    var min = vectorMin(vector);
    vector = vector.map((e) => e - min);
    var sum = 0;
    for(const value of vector){
        sum += value**2;
    }
    return Math.sqrt(sum);
}

const vectorMin = (vector) => {
    var min = 0;
    for(const value of vector){
        if(value < min){
            min = value
        }
    }
    return min;
}

export default vectorNorm;
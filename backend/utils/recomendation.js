import vectorCos from './vectorCos.js';

const recomend = (data, query) => {
    var recomendation = {};
    var threshold = 1;
    for(const value of data){
        var similarity = vectorCos(query, value['vector'])
        if(Object.keys(recomendation).length < 5){
            recomendation[similarity] = value;
            if(similarity < threshold){
                threshold = similarity;
            }
        }else if (similarity > threshold){
            recomendation[similarity] = value;
            const keys = Object.keys(recomendation);
            const sorted = keys.sort(function(a, b){return a - b});
            delete recomendation[sorted[0]]
            threshold = sorted[1]
        }
    }
    var sortedRecomendation = []
    const keys = Object.keys(recomendation);
    const sorted = keys.sort(function(a, b){return a - b});
    for(const value of sorted){
        sortedRecomendation.push(recomendation[value])
    }

    return Object.values(sortedRecomendation);
};

export default recomend;
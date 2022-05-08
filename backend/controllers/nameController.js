import Name from "../models/nameModel.js";
import asyncHandler from "express-async-handler";
import vectorSum from "../utils/vectorSum.js";

const getNewRecomendation = asyncHandler(async (req, res) => {
    const names = req.body['names'];
    const query = req.body['query'];
    const classification = req.body['classification'];
    const iterations = req.body['iterations'];
    const list = req.body['list'];
    console.log(names)

    const data = await Name.find({
        $and: [
            { 'classification': classification },
            { 'name': { $ne: list } }
        ]
    }).exec();

    var newQuery = vectorSum(names[0]['vector'], names[1]['vector']);
    if (query.length > 0) {
        newQuery = vectorSum(query, newQuery);
    }
    const recomendation = ['Julio', 'Marcelo', 'Pedro', 'João', 'Lucas'];

    return res.json({
        'names': recomendation,
        'list': list.concat(names.map((e) => e['name'])),
        'query': newQuery,
        'iterations': (iterations - 1),
        'classification': classification,
    });
})

const getNewRandomicRecomendation = asyncHandler(async (req, res) => {
    const classification = req.body['classification'];
    const iterations = req.body['iterations'];
    const data = await Name.find({ 'classification': classification }).exec();
    var recomendation = [];
    for (var count = 0; count < 5; count++) {
        recomendation.push(data[Math.floor(Math.random() * (data.length - 1))])
    }
    return res.json({
        'names': recomendation,
        'iterations': iterations,
        'classification': classification,
    });
});

const getFinalRecomendation = asyncHandler(async (req, res) => {
    const names = req.body['names'];
    const query = req.body['query'];
    const classification = req.body['classification'];
    const iterations = req.body['iterations'];
    const list = req.body['list'];

    const data = await Name.find({ classification: classification }).exec();
    var newQuery = vectorSum(names[0]['vector'], names[1]['vector']);
    if (query.length > 0) {
        newQuery = vectorSum(query, newQuery);
    }
    const recomendation = ['Julio', 'Marcelo', 'Pedro', 'João', 'Lucas'];

    return res.json({
        'names': recomendation[0],
        'iterations': (iterations - 1),
        'classification': classification,
        'list': list.concat(names.map((e) => e['name'])),
    });
});

export { getFinalRecomendation, getNewRandomicRecomendation, getNewRecomendation };
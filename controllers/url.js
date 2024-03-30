const shortid = require('shortid');

const URL = require('../models/url');


async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(404).json({error: 'id not found'})
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitedHistory: [],
        createdBy: req.user._id
    })
    return res.render('home', {
        id: shortId
    })
}

// async function handleGetShortURL(req,res){
//      const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate(
//         {
//             shortId
//         },
//         { 
//             $push: {
//             visitHistory: {
//                 timeStamp: Date.now()
//             }
//         }})

//         res.redirect(entry.redirectURL);
// }

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}


module.exports = {
    handleGenerateNewShortURL,
    // handleGetShortURL,
    handleGetAnalytics
}
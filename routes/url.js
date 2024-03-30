const express = require('express');
const {handleGenerateNewShortURL, handleGetShortURL, handleGetAnalytics} = require('../controllers/url')
const URL = require('../models/url');
const router = express.Router();

router.post('/', handleGenerateNewShortURL)

// router.get('/:shortId', handleGetShortURL);

router.get('/analytics/:shortId', handleGetAnalytics);

// router.get('/test', async (req, res)=>{
//     const allUrls = await URL.find({});
//     return res.render('home',{
//         urls: allUrls
//     })
// })


module.exports = router;
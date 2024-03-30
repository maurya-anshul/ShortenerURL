const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const URL = require('./models/url');
const {connectToMangoDb} = require('./connect');
const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth')



const urlRoutes = require('./routes/url');
const staticRoutes = require('./routes/staticRouter');
const userRoutes = require('./routes/user')

const app = express();
const port = 8001;

connectToMangoDb('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log('mongodb connected')
})

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use('/url', restrictToLoggedinUserOnly, urlRoutes);
app.use('/user', userRoutes);
app.use('/', checkAuth, staticRoutes);
app.get('/url/:shortId', async(req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        { 
            $push: {
            visitHistory: {
                timeStamp: Date.now()
            }
        }})

        res.redirect(entry.redirectURL);
})

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});

const mongoose = require('mongoose');

mongoose.set("strictQuery", true);
async function connectToMangoDb(url){
    await mongoose.connect(url);
}

module.exports ={
    connectToMangoDb
}
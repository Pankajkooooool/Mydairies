const mongoose = require ('mongoose');


//const mongoURI = 'mongodb://localhost:27017/Mynotes?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';


const mongoURI = 'mongodb+srv://pankajkumar:CUhTDb8Y825c1Nd7@mydairies.lluxi.mongodb.net/Mydairies?retryWrites=true&w=majority';

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to MongoDb")
    })
}

module.exports = connectToMongo;
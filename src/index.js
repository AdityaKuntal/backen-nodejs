const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const mongoose = require('mongoose');
const app = express();
const multer= require("multer");

app.use(multer().any())

app.use(bodyParser.json());
mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://Adityakunta:IPSyBcf7uKmQrNcH@aditya.4payvyl.mongodb.net/?retryWrites=true&w=majority", {
   
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route);


app.listen(  3000,  () =>{
    console.log('Express app running on port ' + ( 3000))
});
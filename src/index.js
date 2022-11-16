const express = require("express")
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Adityakunta:IPSyBcf7uKmQrNcH@aditya.4payvyl.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("hu judh chuka hu ab aap apna kaam kar skte hai dhanybaad! 👍 👍 "))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 1, function () {
    console.log('ye apun ka phela project hai   😄  ' + (process.env.PORT || 1+  " bhai error mat diyo baki me dekh huga vs code chacha  😃  "))
});

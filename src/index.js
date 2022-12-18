
const express = require("express")
// const bodyParser = require('body-parser');
const route = require('./route/route');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());
mongoose.set('strictQuery', true)


mongoose.connect("mongodb+srv://Adityakunta:IPSyBcf7uKmQrNcH@aditya.4payvyl.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("hu judh chuka hu ab aap apna kaam kar skte hai dhanybaad! 👍 👍 "))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT ||1 ,  ()=> {
    console.log('ye apun ka phela project hai   😄  ' + (process.env.PORT || 5+  " bhai error mat diyo baki me dekh huga vs code chacha  😃  "))
});
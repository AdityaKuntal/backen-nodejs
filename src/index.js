const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});



// const value ={
//     usre:"aditya ",
//     pass :"pass"
// }
// const {a,b} = value

// // object2.usre="xyr"
// console.log(a)
// console.log(object2)
// object2.usre="xyr"
 
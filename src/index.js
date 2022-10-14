const express = require('express')
// const  bodyparser  = require('body-parser')
const routes = require('./route/route')
const app = express();  //it is also a global or application level middleware

app.use('/', routes)

app.listen(process.env.PORT||3000,function(){
    console.log('expess app running on a PORT '+(process.env.PORT||3000));
})
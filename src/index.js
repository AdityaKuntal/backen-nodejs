// const { application } = require('express')
const express = require('express')
// const bodyparser = require('bodyparser')
const router = require('./route/route')
const app = express()
// app .use(bodyparser.json())


app.use('/',router)

app.listen(process.env.PORT||3000,function(){
    console.log('Express app running on port ' +(process.env.PORT||3000));

})
const express = require('express')
const bodyparser = require ('body-parser')
const route = require('./route/route')
const app = express();
const mongoose = require('mongoose')
const moment = require('moment')
app.use(bodyparser.json())

 mongoose.connect("mongodb+srv://Adityakunta:IPSyBcf7uKmQrNcH@aditya.4payvyl.mongodb.net/?retryWrites=true&w=majority",{
   
})

.then(()=>console.log("Hukum mere aakaa  🪁  batao kya krna ab mujko  😄   "))
.catch(err=> console.log(err))

app.use((req, res, next) => {
    let ip=req.ip;
    let path=req.originalUrl;
    let timeStamp=moment().format("YYYY-MM-DD hh:mm:ss");

    console.log(timeStamp, ip,path)
    next();
  })

app.use('/', route);



app.listen(process.env.Port||3000,function(){
    console.log("Aupn Chalne Ko Tyar Hai "+ (process.env.Port||3000+  " Mongoose Tum Ko Tumhra Maalik Yaad Kar Rha Hai   😃  "))
    
})

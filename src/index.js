const express  = require("express")

const route  = require("./routes/route")
const {default : mongoose} = require("mongoose")
const app = express()
 

app.use(express.json())
mongoose.set('strictQuery', true)
 


mongoose.connect("mongodb+srv://123:1234@cluster0.pf4v08v.mongodb.net/project-3",{
    
    
})
.then(()=> console.log("mongoDb is connected"))
.catch((err) => console.log(err))

app.use("/",route)

app.listen(3000,()=>{ console.log(("server running on port 3000") )
})
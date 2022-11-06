const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

const tokencheck = async (req,res,next)=>{               
    let token =req.headers["x-auth-token"]
     if(!token) return res.send({msg:"x-auth-token is required!"})
     console.log(token)

     let decodedToken= jwt.verify(token,"function-lithium" )
     if(!decodedToken) return res.send({msg:"Not a valid Token!"})
     req.loggedInUser = decodedToken.userId
     
     next()
 
 }

 const authorise = async (req,res,next)=>{
    let tokendetail =req.params.userId
    // tokendetail=tokendetail.replace(/:/g,'')
    // tokendetail.replace(/:/g,'')
    console.log(tokendetail)
    console.log(req.loggedInUser)
    // if(!mongoose.isValidObjectId(tokendetail)) return res.send({msg:"jhbsjfbjasvfavfdvas"})
     //if(!token) return res.send({msg:"x-auth-token is required!"})
     if(req.loggedInUser != tokendetail){
        

        return res.send({msg:"unauthorised"})
     }
    next()
 }
 


module.exports.mid1=tokencheck
module,exports.mid2=authorise
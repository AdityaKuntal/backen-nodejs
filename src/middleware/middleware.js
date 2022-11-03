const jwt = require('jsonwebtoken')

const letCheckIsFreeAppUser = async (req,res,next)=>{               
   let token =req.headers["x-auth-token"]
    if(!token) return res.send({msg:"x-auth-token is required!"})
    let decodeToken= jwt.verify(token,"function-lithium" )
    if(!decodeToken) return res.send({msg:"Not a valid Token!"})
    
    next()

}

module.exports.mid1=letCheckIsFreeAppUser

const userModel = require('../model/userModel')


 const createUser = async function (req,res,next){
 req.body["isFreeAppUser"] = req.header.isFreeAppUser
 let users= req.body
 let newUser = await userModel.create(users)
 res.send({status:true,data:newUser})
}


 module.exports.createUser=createUser






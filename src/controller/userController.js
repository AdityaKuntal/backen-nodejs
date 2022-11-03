
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')



let createUser = async (req, res) => {
    let userinfo = req.body
    let data = await userModel.create(userinfo)
    res.send({ newuser: data })

}


let login = async (req , res) =>{
    let email = req.body.emailId
    if(!email) return res.send({status : false , msg : "email is not provided"})
    let password = req.body.password
    if(!password) return res.send({status : false , msg : "password is not provided"})
    let user = await userModel.findOne({emailId:email,password:password})
    if(!user) return res.send({status : false , msg: "eamil and password is not correct"})
    let token = jwt.sign({userId : user._id.toString()},"function-lithium")
    res.send({status:true , msg:token})
    
  
}

let getUserDetail =async function(req,res){
    let userId=req.params.userId
    let getUserDetail=await userModel.findOne({userId:userId})
    if(!getUserDetail) return res.send({msg:"User detail not found!"})
     res.send({Status:true,data:getUserDetail})
    }

    const upadteOne = async(req,res)=>{
       let userId = req.params.userId
       let updatedUserData = req.body
       let updateUser = await userModel.findOneAndUpdate({userId:userId},updatedUserData,{new:true})
         if(!updateUser){return res.send({status:false , msg:"user id does  not exist"})}
         res.send({status:true,data:updateUser})
    }

    const  deleteuser = async (req,res)=>{
        let userId = req.params.userId
        let user = await userModel.findById(userId)
        if(!user) {
            return res.send({status: false, message: "no such user exists"})
        }
        let updatedUser = await userModel.findOneAndUpdate({userId: userId}, {isDeleted: true}, {new: true})
        res.send({status: true, data: updatedUser})
    }

    
 module.exports.createUser=createUser
 module.exports.login=login
 module.exports.getUser=getUserDetail
 module.exports.upadteOne=upadteOne
 module.exports.deleteuser=deleteuser
 






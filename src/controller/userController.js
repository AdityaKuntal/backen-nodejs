
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
    let token = jwt.sign({userId : user._id},"function-lithium")
    res.send({status:true , msg:token})
    
  
}

let getUserDetail =async function(req,res){
    let userId=req.params.userId//.replace(/:/g,'')
    let newuser= await userModel.findById(userId)
    
    if(!newuser) return res.send({msg:"User detail not found!"})
     res.send({Status:true,data:newuser})
    }

    const upadteOne = async(req,res)=>{
       let userId = req.params.userId
       let updatedUserData = req.body
       let updateUser = await userModel.findOneAndUpdate({userId:userId},updatedUserData,{new:true})
         if(!updateUser){return res.send({status:false , msg:"user id does  not exist"})}
         res.send({status:true,data:updateUser})
    }

    const  deleteuser = async (req,res)=>{
     
            let Data=req.params.userId
            let findUser=await userModel.findById(Data)
            if(!findUser) return res.send({msg:"no user found"})
            let userDelete=await userModel.findOneAndUpdate({_id:Data},{isDeleted:true},{new:true})
            return res.send({data:userDelete,msg:true})
          }
    

    
 module.exports.createUser=createUser
 module.exports.login=login
 module.exports.getUser=getUserDetail
 module.exports.upadteOne=upadteOne
 module.exports.deleteuser=deleteuser
 






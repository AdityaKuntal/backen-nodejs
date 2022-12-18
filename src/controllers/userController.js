const userModel=require("../models/userModel")
const bcrypt=require("bcrypt")
const saltRounts=10
const jwt = require('jsonwebtoken')


const {
  isValidName,
  isValidPassword,
  isValidEmail,
  isValidTitle,
  isValidMobileNo,
  isValidPincode,
  isValidStreet}=require("../validation/validation")


exports.registerUser=async (req,res)=>{
try{

  const data = req.body;

  const { title, name, phone, email, password, address } = { ...data };
  const { street, city, pincode } = { ...address };

  if (!title) {
    return res
      .status(400)
      .send({ status: false, message: "title is required" });
  }

  if (!name) {
    return res
      .status(400)
      .send({ status: false, message: "name is required" });
  }

  if (!phone) {
    return res
      .status(400)
      .send({ status: false, message: "phone is required" });
  }

  if (!email) {
    return res
      .status(400)
      .send({ status: false, message: "email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .send({ status: false, message: "password is required" });
  }

  if (address) {
    if (typeof address !== "object") {
      return res
        .status(400)
        .send({ status: false, message: "address must be type object" });
    }
  }

  if (!isValidTitle(title)) {
    return res
      .status(400)
      .send({ status: false, message: "Enter a valid title" });
  }

  if (!isValidName(name)) {
    return res
      .status(400)
      .send({ status: false, message: "Enter a valid name" });
  }

  if (!isValidMobileNo(phone)) {
    return res
      .status(400)
      .send({ status: false, message: "Enter a valid phone number" });
  }

  const isPhoneAlreadyUsed = await userModel.findOne({ phone });

  if (isPhoneAlreadyUsed) {
    return res
      .status(400)
      .send({ status: false, message: "phone already exist" });
  }
  if (!isValidEmail(email)) {
    return res
      .status(400)
      .send({ status: false, message: "Enter a valid email" });
  }

  const isEmailAlreadyUsed = await userModel.findOne({ email });

  if (isEmailAlreadyUsed) {
    return res
      .status(400)
      .send({ status: false, message: "email already exist" });
  }

  if (!isValidPassword(password)) {
    return res.status(400).send({
      status: false,
      message:
        "Enter a valid password (min-8,max-15, contains atleast one num and symbol each, Have a mixuture of uppercase and lowercase letters)",
    });
  }

  if (address) {
    if (!isValidStreet(street)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid street" });
    }

    if (!isValidName(city)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid city" });
    }

    if (isValidPincode(pincode)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid pincode" });
    }
  }

const salt=await bcrypt.genSalt(saltRounts)
const HassPassword= await bcrypt.hash(password,salt)
req.body["password"]=HassPassword


const dataStore = await userModel.create(data)
return res.status(201).send({status:true,msg:"userCreate successfully" ,dataStore})


}
catch(err){
return res.status(400).send({status:false,msg:err.message})
}
}



 exports.loginUser= async function(req,res){
    try{
       email=req.body.email
        password=req.body.password
        //===============================================user email  id is requires===================================================//      
        if (!email) return res
        .status(400)
        .send({ status: false, msg: "email id is required" })

        //=================================================Password is required ======================================================//     
        if (!password) return res
        .status(400)
        .send({ status: false, msg: "Password is required" })
      //==============================================checking the email id or password is exist or not ===========================//     
      let getUser = await userModel
      .findOne({ email: email}).select({password:1})
      

      //================================================User not found==============================================================//    
      if (Object.keys(getUser).length == 0) return res.status(404).send({ status: false, msg: "User not found" })

      //========================================password matching by bcrypt.compare method password comeparing ==================================//      
      const matchPassword = await bcrypt.compare(password, getUser.password)

      if (!matchPassword) return res
      .status(401)
      .send({ status: false, msg: "Password is incorrect" })

      let Payload = {
        UserId: getUser._id.toString(),
        EmailID: getUser.email,
        Batch: "lithium",
        Group: "40",
        Project: "project-booksManagementementGroup3",
      }

    
            
      let token ;
      
      token=  jwt.sign(Payload, "keep-it-secret-tillThe-endOf-Course", {
          expiresIn: "1d",
        });
      
      res.setHeader("x-api-key", token);
       return res
       .status(200)
       .send({status:true, message:"token is successfully generated", token}) 


    }catch(error){
       return res
       .status(500)
       .send({status: false, message: error.message, message: " server error"  })
    }
}


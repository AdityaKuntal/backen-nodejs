const userModel = require('../model/userModel')
const productModel = require('../model/productModel')
const OrderModel = require('../model/orderModel')
const orderModel = require('../model/orderModel')


const orderpurchase = async function (req,res,next){
    let productId = req.body.productId
    let userId=  req.body.productId
    let isFreeAppUser1 = req.body.isFreeAppUser;
    let product_Id = await productModel.findById(userId).select({_id:1})
    let user_Id  = await userModel.findById(productId).select({_id:1})

    if(user_Id===null){
        res.send({status :false , msg:"userId does not exist"})
    }else if(userId._id){
        if(product_Id===null){
            res.send({status:false,msg:"userId does not exist"})
        }else if(productId._id){

             if(isFreeAppUser1==="true"){
                let updateUser = await userModel.updateOne({ _id: userId._id }, { $set: { isFreeAppUser: true } }, { new: true });
                req.body["isFreeAppUser"] = isFreeAppUser1;
                req.body["amount"]=0;
                let orderForFreeAppUser = req.body;
                let saveOrder = await orderModel.create(orderForFreeAppUser)
                res.send({ "User Data": updateUser, "Order:": saveOrder });


            } else if(isFreeAppUser1==="false"){
                let user=await userModel.find().select({balance:1,_id:1})
                let balance=parseInt(user[0].balance)
                let product=await productModel.find().select({price:1,_id:1})
                let price=parseInt(product[0].price)
                if(price<=balance){
                    balance-=price;
                    req.body["amount"]=price;
                    req.body["isFreeAppUser"]=isFreeAppUser1;
                    let orderForPaidUser=req.body
                    let updateUser = await userModel.updateOne({ _id: userId._id }, { $set: { isFreeAppUser: false ,balance:balance} }, { new: true });
                    let saveUserOrder=await orderModel.create(orderForPaidUser)

                    res.send({Order:saveUserOrder, "Update user:" :updateUser})
                } else if(price>balance) {

                    res.send({msg:"User is having insufficient balance!"})

                }
               
            }

        }
    }


}


module.exports.orderpurchase=orderpurchase


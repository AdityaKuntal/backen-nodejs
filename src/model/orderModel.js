const mongoose=require('mongoose');
const objectId=mongoose.Schema.Types.ObjectId;

let orderSchema=new mongoose.Schema({
userId:{
    type:objectId,
    ref:"User"
},
productId:{
    type:objectId,
    ref:"Product"
},
amount:Number,
isFreeAppUser:{
    type:Boolean,
    default:true
},
date:{
    type:String
}

},{timestamps:true})

module.exports=mongoose.model('Order', orderSchema)

  const mongoose =require('mongoose')
  const ObjectId=mongoose.Schema.Types.ObjectId
  const newBookSchema = mongoose.Schema({
  name:String,
  author:{
  type:ObjectId,
  ref:"NewAuthor",
  required:true,
  },
  price:Number,
  ratings:Number,
  publisher:{
      type:ObjectId,
      ref:"NewPublisher",
      required:true
  },
  isHardCover:{
      type:Boolean,
      default:false
  }
  },{timestamps:true})
  
  module.exports=mongoose.model('NewBook',newBookSchema)
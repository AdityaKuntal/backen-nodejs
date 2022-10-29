const mongoose = require("mongoose")
const newPublisherSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    headQuarter:String
},{timestamps:true})

module.exports=mongoose.model('NewPublisher',newPublisherSchema)


// const updateSpecificBooks = async function (req, res) {
//     let publisherId = await publisherModel
//       .find({ name: ["Penguin", "HapperCollins"] }).select({ _id:1});
      
    
//     let book1 = await bookModel.updateMany({publisher: publisherId}, //condition
//        {isHardCover: true}   //update
//        );
       
//     //    let authorIds=await authorModel.find({rating:{$gt:3.5}}).select({_id:1})
//     //    let book2=await bookModel.updateMany({author:authorIds},{$inc:{price:10}})
  
   
  
//      return res.send({book1});
//   };

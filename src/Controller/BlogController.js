const authourModel = require("../Models/authorModel");
const blogModel = require("../Models/blogModel");
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')


exports.createBlog = async (req, res)=> {
  try {
    let data = req.body;
    let CurrentDate = moment().format("DD MM YYYY hh:mm:ss");

    let authorDetails = await authourModel.findById(data["authorId"]);

    if (!authorDetails) {
      return res
        .status(400)
        .send({ status: false, msg: " author is not present." });
    }

    if (data["isPublished"] == true) {
      data["publishedAt"] = CurrentDate;
    }
    if (data["isdeleted"] == true) {
      data["deletedAt"] = CurrentDate;
    }

    let savedData = await blogModel.create(data);
    res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};


exports.getBlogs = async (req, res)=> {
  try {
    let filter = req.query;

    // if (Object.keys(filter) == 0) {
    //   return res.status(404).send({ status: false, msg: "Provide a valid input" });
    // }
    
    let getBlogsDetails = await blogModel.find({
      $and: [filter, { isdeleted: false, isPublished: true }],
    });

    if (!getBlogsDetails[0]) {
      return res
        .status(404)
        .send({ status: false, msg: " Blog is not present." });
    }
    return res.status(200).send({ status: true, data: getBlogsDetails });

  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

exports.updateBlogs = async (req, res)=> {
  try {
    
      let blogId = req.params.blogId;
      let dataForUpdate = req.body;
      let tokensId = req.decodedToken.userId;
      let {title, body, tags, subcategory} = {...dataForUpdate}
  
      let CurrentDate = moment().format("DD MM YYYY hh:mm:ss");
  
      if (!mongoose.isValidObjectId(blogId)) {
        return res
          .status(400)
          .send({ status: false, error: "blogId is invalid" });
      }
  
      if (Object.keys(dataForUpdate) == 0) {
  
        return res.status(404).send({ status: false, msg: "Provide a input to update" });
      }
      let blog = await blogModel.findOne({_id : blogId})
      
      if (blog.authorId.toString() == tokensId) {
        return res
          .status(401)
          .send({ status: false, message: `Unauthorized access` });
      }
  
      let updateBlog = await blogModel.findOneAndUpdate(
        { _id: blogId, isPublished: false, isdeleted: false },
        {
          $push: { tags: tags, subcategory: subcategory },
  
          $set: {
            title: title,
            body: body,
            isPublished: true,
            publishedAt: CurrentDate,
          },
        },
        { new: true }
      );
  
      if (!updateBlog ) {
        return res
          .status(404)
          .send({ status: false, msg: "Blog does not exist." });
      }
  
  
      res.status(200).send({ status: true, data: updateBlog });
  
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};




exports.deleteBlog = async (req, res) =>{
  try {
    let blogId = req.params.blogId;
    let tokensId = req.decodedToken.userId;

    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).send({ status: false, msg: "blogId is invalid" });
    }

    let getBlogDetails = await blogModel.findOne({ _id: blogId , isPublished: true });

    if (!getBlogDetails || getBlogDetails["isdeleted"] == true) {
      return res
        .status(404)
        .send({ status: false, msg: " Blog does not exist." });
    }

    if (getBlogDetails.authorId.toString() == tokensId) {
      return res
        .status(401)
        .send({ status: false, message: `Unauthorized access` });
    }

    let deleteBlog = await blogModel.updateOne(
      { _id: blogId },
      { $set: { isdeleted: true } }
    );

    

    res.status(200).send({ status: false, msg: "Blog deleted successfully" ,deleteBlog});

  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};


exports.deletedocs = async (req, res)=>{
  try {
    let query = req.query;
    let data = {isPublished: true, isdeleted: false, ...query}
    let tokensId = req.decodedToken.userId;
    
    if (Object.keys(query) == 0) {
      return res.status(404).send({ status: false, msg: "input is required" });
    }

    
    let blogDetails = await blogModel.findOne(data)
    
    if ( !blogDetails ) {
      return res
      .status(400)
      .send({ status: false, message: `Blog not exist`});
    }
    if ( blogDetails.authorId.toString() == tokensId) {
      return res
      .status(401)
      .send({ status: false, message: `Unauthorized access` });
    }
    
    let deleteBlogs = await blogModel.updateMany(data, {
      $set: { isdeleted: true  },
    });

    if (deleteBlogs["matchedCount"] === 0) {
      return res.status(404).send({ status: false, msg: "Blog not exist" });
    }

    res.status(200).send({ status: false, msg: "Blog deleted successfully" });
    } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};



exports.loginUser = async (req, res)=>{
  try {
    email = req.body.email;
    password = req.body.password;
//===================user email  id is requires===    
    if (!email){
       return res
       .status(400)
       .send({ status: false, msg: "email id is required" })}

    //============= Password is required ======   
    if (!password) {
      return res
      .status(400)
      .send({ status: false, msg: "Password is required" })
}
    //======checking the email id or password is exist or not ===== 
    let getUser = await authourModel
    .findOne({ email: email })
    .select({ password: 1 })

    //========= User not found============ 
    if (Object.keys(getUser).length == 0) {
      return res
      .status(404)
      .send({ status: false, msg: "User not found" })}

    //=====password matching by bcrypt.compare method password comeparing ======      
    const matchPassword = await bcrypt.compare(password, getUser.password)
    if (!matchPassword) { return res.status(401).send({ status: false, msg: "Password is incorrect" })}

      //start creating a token 
 let token;
    try {
        token = jwt.sign({                                 //jwt.sign to creating the token 
            authorId: getUser._id.toString(),
            developer: "lithium Group5"                    //   payload
        }, "lithium key is very very protected");         // signature key
    } catch (err) {
        return res
        .status(400)
        .send({ status: false, msg: "Error", error: err.message })
    }

    //   ===setHeader with some information ======
    res.setHeader("x-api-key", token);                 // set the header for name of the token
    return res
    .status(201)
    .send({ status: true, msg: "User login sucessful", token })
}
catch (err) {
    return res
    .status(500)
    .send({ status: false, msg: "Error", error: err.message })
}
}

 

//============================================END===========================================================\\

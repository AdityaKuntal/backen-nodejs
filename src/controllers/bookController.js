
const userModels = require('../models/userModel')
const bookModels = require('../models/bookModel')
const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");
const moment= require('moment')
const {
    isValidName,
    isValidISBN,
    isValidReviews,
    isValidDate } = require('../validation/validation')

exports.createBook = async (req, res) => {
        try {
          let data = req.body;
          let {
            title,
            excerpt,
            userId,
            ISBN,
            category,
            subcategory,
            reviews,
            
          } = data;


          const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a')
      
          if (!title) {
            return res
              .status(400)
              .send({ status: false, message: "title is required" });
          }
          if (!excerpt) {
            return res
              .status(400)
              .send({ status: false, message: "excerpt is required" });
          }
          if (!userId) {
            return res
              .status(400)
              .send({ status: false, message: "userId is required" });
          }
          if (!ISBN) {
            return res
              .status(400)
              .send({ status: false, message: "ISBN is required" });
          }
          if (!category) {
            return res
              .status(400)
              .send({ status: false, message: "category is required" });
          }
          if (!subcategory) {
            return res
              .status(400)
              .send({ status: false, message: "subCategory is required" });
          }
          
      
          //------type validation----//
      
          if (!isValidName(title)) {
            return res
              .status(400)
              .send({ status: false, message: "Enter valid title" });
          }
      
          const isTitleAlreadyUsed = await bookModels.findOne({ title });
      
          if (isTitleAlreadyUsed) {
            return res
              .status(400)
              .send({ status: false, message: `title is already registered` });
          }
      
          if (!isValidName(excerpt)) {
            return res
              .status(400)
              .send({ status: false, message: "Enter valid excerpt" });
          }
      
          if (!mongoose.isValidObjectId(userId)) {
            return res
              .status(400)
              .send({ status: false, message: "Enter valid userId" });
          }
      
          const isValidUser = await userModels.findOne({ _id: userId });
      
          if (!isValidUser) {
            return res.status(400).send({ status: false, message: `User not exist` });
          }
      
          if (!isValidISBN(ISBN)) {
            return res
              .status(400)
              .send({ status: false, message: "Enter valid ISBN" });
          }
      
          const isIsbnAlreadyUsed = await bookModels.findOne({ ISBN: ISBN });
      
          if (isIsbnAlreadyUsed) {
            return res
              .status(400)
              .send({ status: false, message: `ISBN is already registered` });
          }
      
          if (!isValidName(category)) {
            return res
              .status(400)
              .send({ status: false, message: "Enter valid category" });
          }
      
          if (!isValidName(subcategory)) {
            return res
              .status(400)
              .send({ status: false, message: "Enter valid subcategory" });
          }
      
         
      
          //-------- extra----------//
          if (reviews) {
            if (!isValidReviews(reviews)) {
              return res
                .status(400)
                .send({ status: false, message: "Enter valid reviews" });
            }
          }
      
         

          data["releasedAt"] = currentDate

        if (data["isDeleted"]===true) {
            data["deletedAt"] = currentDate
        }
      
          let saveddata = await bookModels.create(data);
      
          return res
            .status(201)
            .send({ status: true, message: "success", data: saveddata });
        } catch (error) {
          return res.status(500).send({ status: false, message: error.message });
        }
      };
      

exports. getBooks = async function (req, res) {
    try {
      let data = req.query;
  
      if (req.query.userId) {
        if (!mongoose.isValidObjectId(req.query.userId)) {
          return res
            .status(400)
            .send({ status: false, message: "Enter valid userId" });
        }
      }
      
      let obj 
  
      if (data.bookId) {
         obj = { isDeleted: false, _id: data.bookId, ...data };
      } else {
         obj = { isDeleted: false, ...data };
      }
  
      let books = await bookModels
        .find(obj)
        .select("_id title excerpt userId category releasedAt reviews");
  
      if (books.length == 0) {
        return res.status(404).send({ status: false, message: "No Book Found" });
      }
  
      let booksData = books.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
  
      return res
        .status(200)
        .send({ status: true, message: "Book List", data: booksData });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };

  ////===================================================  fetching book details by params (bookId)  ========================================================//////

exports.getBooksParams = async function (req, res) {
    try {
      let bookId = req.params.bookId;
  
      if (!mongoose.isValidObjectId(req.params.bookId)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter valid bookId" });
      }
  
      const bookData = await bookModels
        .findOne({ _id: bookId, isDeleted: false })
        .select({ ISBN: 0 });
  
      if (!bookData) {
        return res.status(404).send({ status: false, message: "Book not exist" });
      }
      let bookDetails = bookData.toObject();
  
      const reviewData = await reviewModel
        .find({
          bookId: bookId,
          isDeleted: false,
        })
        .select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 });
  
      let data = { ...bookDetails, review: reviewData };
  
      return res
        .status(200)
        .send({ status: true, message: "Book List", data: data });
    } catch (error) {
      return res.status(500).send({ status: false, message: error });
    }
  };

  //=============================================================update book========================================================//

exports.updateBook = async function (req, res) {
    try {
      let bookId = req.params.bookId;
      let { title, excerpt, releasedAt, ISBN } = req.body;
  
      if (!bookId) {
        return res
          .status(400)
          .send({ status: false, message: "please provide bookId" });
      }
      if (!mongoose.isValidObjectId(bookId)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter valid bookId" });
      }
  
      if (Object.keys(req.body).length == 0) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide any input to update" });
      }
  
      if (!isValidName(title)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter valid title" });
      }
  
      if(title){const isTitleAlreadyUsed = await bookModels.findOne({
        title,
        isDeleted: false,
      });
  
      if (isTitleAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, message: `title is already registered` });
      }}
  
      if (excerpt) {
        if (!isValidName(excerpt)) {
          return res
            .status(400)
            .send({ status: false, message: "Enter valid excerpt" });
        }
      }
  
      if (ISBN) {
        if (!isValidISBN(ISBN)) {
          return res
            .status(400)
            .send({ status: false, message: "Enter valid ISBN" });
        }
      }
  
      const isIsbnAlreadyUsed = await bookModels.findOne({
        ISBN,
        isDeleted: false,
      });
  
      if (isIsbnAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, message: `ISBN is already registered` });
      }
  
      
  
      const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a')
      req.body["releasedAt"]=currentDate
  
      const update = await bookModels.findOneAndUpdate(
        { _id: bookId, isDeleted: false },
        {
          $set: {
            title: title,
            excerpt: excerpt,
            currentDate: releasedAt,
            ISBN: ISBN,
          },
        },
        { new: true }
      );
  
      if (!update) {
        return res.status(404).send({ status: false, message: "Book not exist" });
      }
  
      return res
        .status(200)
        .send({ status: true, message: "Book List", data: update });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };

  //=============================================================delete book==============================================================//

exports.deletbook = async function (req, res) {
    try {
      let bookId = req.params.bookId;
  
      if (!bookId) {
        return res
          .status(400)
          .send({ status: false, message: "please provide bookId" });
      }
  
      if (!mongoose.isValidObjectId(req.params.bookId)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter valid bookId" });
      }
  
      let bookD = await bookModels.findOneAndUpdate(
        { _id: bookId, isDeleted: false },
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true }
      );
  
      if (!bookD) {
        return res.status(404).send({ status: false, message: "Book not exist" });
      }
  
      return res
        .status(200)
        .send({ status: true, message: "Deleted Seccessfully!" });
    } catch (error) {
      return res.status(500).send({ status: false, message: error });
    }
  };



 


 
  

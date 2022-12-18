const mongoose = require("mongoose");
const bookModel= require('../models/bookModel')
const moment=require('moment')
const reviewModel = require('../models/reviewModel')


const {
  isValidName,
  isValidRating,
  isValidDate,
  isValid
} = require('../validation/validation')

////============================================================== create review =====================================================//////

exports. createReview = async function (req, res) {
  try {
    let BookId = req.params.bookId;
    let data = req.body;

    let { bookId, reviewedBy, reviewedAt, rating, review } = data;

    if (!mongoose.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid bookId" });
    }

    if (!mongoose.isValidObjectId(BookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid bookId in params" });
    }

    if (BookId != bookId) {
      return res
        .status(400)
        .send({
          status: false,
          message: "bookId in params and body should be same is required",
        });
    }

    if (!BookId) {
      return res
        .status(400)
        .send({ status: false, message: "bookId is required" });
    }

    if (!bookId) {
      return res
        .status(400)
        .send({ status: false, message: "BookId is required" });
    }


    if (!rating) {
      return res
        .status(400)
        .send({ status: false, message: "rating is required" });
    }

    if (!isValidName(reviewedBy)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid reviewedBy" });
    }


    if (!isValidRating(rating)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter rating from 1 to 5" });
    }

    if (!isValidName(review)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid review" });
    }

    // validation for empty string

    if(!isValid(reviewedBy)){
      return res.status(400).send({msg:"please enter a  valid data for reviewedBy "})
    }

    if (!isValid(review)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter a  valid data for review" });
    }
    if (!isValid(rating)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter a  valid data for rating" });
    }
    

    if (!data.reviewedBy) {
      data.reviewedBy = "guest";
    }

    let createData = { ...data };

    let createReview = await reviewModel.create(createData);

    let getBook = await bookModel.findOne({
      _id: createReview.bookId,
      isDeleted: false,
    });

    if (!getBook) {
      return res.status(400).send({ status: false, message: "Book not exist" });
    }
    const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a')
    
     data["reviewedAt"]=currentDate
  

    let updateBook = await bookModel
      .findOneAndUpdate(
        { _id: createReview.bookId, isDeleted: false },
        { $set: { reviews: getBook.reviews + 1,currentDate:reviewedAt } },
        { new: true }
      )
      .select({ __v: 0, ISBN: 0 });

    if (!updateBook) {
      return res.status(400).send({ status: false, message: "Book not exist" });
    }
   

    let bookDetails = updateBook.toObject();
    let reviewDetails = createReview.toObject();

    let responseData = {
      ...bookDetails,reviewDetails:
      [ {
        _id: reviewDetails._id,
        bookId: reviewDetails.bookId,
        reviewedBy: reviewDetails.reviewedBy,
        reviewedAt: currentDate,
        rating: reviewDetails.rating,
        review: reviewDetails.review,
      } ],
    };

    return res
      .status(201)
      .send({ status: true, message: "Book list", data: responseData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

////==================================================Update Review ========================================================/////

exports. updateReview = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    let reviewId = req.params.reviewId;
    let { review, rating, reviewedBy } = req.body;

    if (!mongoose.isValidObjectId(req.params.bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid bookId" });
    }

    if (!mongoose.isValidObjectId(req.params.reviewId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid reviewId" });
    }

    if (!bookId) {
      return res
        .status(400)
        .send({ status: false, message: "bookId is required" });
    }

    if (!reviewId) {
      return res
        .status(400)
        .send({ status: false, message: "reviewId is required" });
    }

    if (Object.keys(req.body).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide any input to update" });
    }

    const bookData = await bookModel
      .findOne({ _id: bookId, isDeleted: false })
      .select({ __v: 0, ISBN: 0 });

    if (!bookData) {
      return res.status(404).send({ status: false, message: "Book not exist" });
    }

    const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a')
    req.body["releasedAt"]=currentDate
    


    const updatedReview = await reviewModel
      .findOneAndUpdate(
        { _id: reviewId, bookId: bookId, isDeleted: false },
        {
          $set: {
            review: review,
            rating: rating,
            reviewedBy: reviewedBy,
            reviewedAt: currentDate,       
          },
        },
        { new: true }
      )
      .select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 });

    if (!updatedReview) {
      return res
        .status(404)
        .send({ status: false, message: "Review not exist" });
    }

    let bookDetails = bookData.toObject();

    let reviewData = updatedReview.toObject();

    let responseData = { ...bookDetails, reviewData };

    return res
      .status(200)
      .send({ status: true, message: "book list", data: responseData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

////============================================================== delete review =====================================================//////

exports. deletReview = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    let reviewId = req.params.reviewId;

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

    if (!reviewId) {
      return res
        .status(400)
        .send({ status: false, message: "please provide reviewId" });
    }

    if (!mongoose.isValidObjectId(req.params.reviewId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid reviewId" });
    }

    const bookData = await bookModel
      .findOne({ _id: bookId, isDeleted: false })
      .select({ __v: 0, ISBN: 0 });
      console.log(bookData)

    if (!bookData) {
      return res.status(404).send({ status: false, message: "Book not exist" });
      
    }

    let deletReview = await reviewModel.findOneAndUpdate(
      { _id: reviewId, bookId: bookId, isDeleted: false },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      },
      { new: true }
    );

   

    if (!deletReview) {
      return res
        .status(404)
        .send({ status: false, message: "Review not Exist!" });
    }

    let updateBook = await bookModel
      .findOneAndUpdate(
        { _id: bookId, isDeleted: false },
        { $set: { reviews: bookData.reviews -1} }
      )

    return res
      .status(200)
      .send({ status: true, message: "Deleted Successfully" ,updateBook});
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};
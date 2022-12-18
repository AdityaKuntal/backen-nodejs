const express = require('express');
const router=express.Router()
const { registerUser, loginUser } = require('../controllers/userController');
const { createBook, getBooks, getBooksParams, updateBook, deletbook } =require("../controllers/bookController")
const{ createReview, updateReview ,deletReview}= require('../controllers/reviewController')
const{ authentication, Authorisation }= require('../mid/auth')





router.post("/register",registerUser)
router.post("/logins", loginUser )

//------book apis--------//

router.post("/books",authentication,createBook)

router.get("/books",authentication,getBooks)

router.get("/books/:bookId",authentication, getBooksParams )

router.put("/books/:bookId",authentication,Authorisation, updateBook )

router.delete("/books/:bookId",authentication,Authorisation, deletbook )

//------review apis--------//

router.post("/books/:bookId/review", createReview )

router.put("/books/:bookId/review/:reviewId", updateReview )

router.delete("/books/:bookId/review/:reviewId", deletReview )


module.exports=router

const express = require('express')
const Router = express.Router()
const bookControllers = require('../bookController/bookController')




router.post("/createNewAuthor", bookControllers.createNewAuthor)



router.get("/getNewAuthor", bookControllers.getNewAuthor)



router.post("/createNewBook", bookControllers.createNewBook)



router.get("/getNewBook", bookControllers.getNewBook)



router.post("/createNewPublisher", bookControllers.createNewPublisher)



router.get("/getNewPublisher", bookControllers.getNewPublisher)



router.put("/putNewBook", bookControllers.putNewBook)




router.put("/updateRating", bookControllers.updateRating)










module.exports=Router
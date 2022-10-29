
const express = require('express')
const Router = express.Router()
const bookController = require('../bookController/bookController')


Router.post("/author",bookController.author)
Router.post("/Publisher",bookController.Publisher)
Router.post("/NewBook",bookController.NewBook)
Router.get("/myUpdate",bookController.myUpdate)
Router.put("/myGetBooks",bookController.myGetBooks)














module.exports=Router

const express = require('express')
const Router = express.Router()
const orderController = require('../controller/orderController')
const productController = require('../controller/productController')
const userController = require('../controller/userController')
const middleware = require ('../middleware/middleware')





Router.post('/createUser',middleware.mid1,userController.createUser)
Router.post('/createProduct',productController.createProduct)
Router.post('/orderpurchase',middleware.mid1,orderController.orderpurchase)













module.exports=Router
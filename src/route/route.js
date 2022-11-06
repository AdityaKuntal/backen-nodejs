
const express = require('express')
const Router = express.Router()
const userController = require('../controller/userController')
const middleware = require ('../middleware/middleware')




Router.post("/createUser", userController.createUser  )

Router.post("/login",userController.login)

Router.get('/userDetail/:userId',middleware.mid1, middleware.mid2,userController.getUser)
Router.put('/usersUpdate/:userId',middleware.mid1, middleware.mid2,userController.upadteOne)
Router.delete('/usersDelete/:userId',middleware.mid1,userController.deleteuser)













module.exports=Router
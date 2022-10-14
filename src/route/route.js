const express = require('express')
const { functions } = require('lodash')
const router = express.Router()
const logger = require('../logger/logger')
const util = require ('../util/helper')
const stu = require("../validator/formatter")

router.get('/testme', function(req ,res){
    // res.send
    // console.log(res('this is my first api'))
    res.send("this is my first api welcome to nodejs")
})

router.get('/myapi', function(req ,res){
    res.send("welcome to my world")
})

router.get('/new-things', function(req ,res){
    res.send("hiii my name is aditya ")                  
})

router.get('/test-meee',function(req,res){
    console.log((`hello there my name is aditya kuntal`),logger.welcome())
    
    res.send("hello every one")
    })
//     router.get('/chaljabhai',function(req,res){
//         console.log("inside router",util.time());
//         // console.log('this is the my first abhi ',util.date())
//         console.log(('this is the my first API '),util.getBatchInfo())
//         res.send('hiii dear')
    
// })

// router.get('/banj',function(req,res){
//     console.log('this is the my first abhi ',util.Date())
//     // console.log(('this is the my first API '),util.getBatchInfo())
//     res.send('hiii dear')

//})
router.get('/test-mee',function(req,res){
    // console.log("I am inside route",xyz.myWelcome())
    console.log("inside router",util.time());
    console.log("I am inside route",util.getBatch())
    console.log("Hii succesfully trim word",stu.newFun())
    // console.log("Succesufully turn upperCase to lowerCase word",stu.myLower())
    // console.log("succesfully turn into uppercase",stu.myUpper())

     res.send("kuch bhi")
})



module.exports = router


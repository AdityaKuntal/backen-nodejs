const express = require('express')
const router = express.Router()

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

module.exports = router
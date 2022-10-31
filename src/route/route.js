
const express = require('express')
const Router = express.Router()
const bookController = require('../bookController/bookController')


Router.post("/author",bookController.author)
Router.post("/Publisher",bookController.Publisher)
Router.post("/NewBook",bookController.NewBook)
Router.get("/myUpdate",bookController.myUpdate)
Router.put("/myGetBooks",bookController.myGetBooks)


const moment = require('moment');
const { path } = require('express/lib/application');
Router.get("/dateManipulations", function (req, res) {
    
    // const today = moment();
    // let x= today.add(10, "days")

    // let validOrNot= moment("29-02-1991", "DD-MM-YYYY").isValid()
    // console.log(validOrNot)
    
    const dateA = moment('01-01-1900', 'DD-MM-YYYY');
    const dateB = moment('01-01-2000', 'DD-MM-YYYY');

    let x= dateB.diff(dateA, "days")
    console.log(x)

    res.send({ msg: "all good"})
})













module.exports=Router
const express = require('express')
const router = express.Router()
const newthings = require('../movies/movies')

router.get('/movies',function(req,res){
console.log("this is my first api",newthings.movies())
res.send("how was your day")
})


router.get('/number',newthings.number)  // path any things we create .... in
router.get('/movies/:indexNumber',newthings.indexNumber)
router.get('/moviesIndex/:moviesIndex',newthings.moviesIndex)

module.exports = router
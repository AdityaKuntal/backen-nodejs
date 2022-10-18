
// Create an API for GET /movies that returns a list of movies. 
// Define an array of movies in your code and return the value in response.

// Create an API GET /movies/:indexNumber (For example GET /movies/1 is a valid request and it should return 
// the movie in your array at index 1).
//  You can define an array of movies again in your api
let dhamka = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"] //7
function movies(req,res) {
   
    return dhamka
}
// let dhamka = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
function indexNumber(req,res){
var indexNumber =req.params.indexNumber
if(indexNumber>dhamka.length-1||indexNumber<0){
    res.send("Please give us a valid number so we can able to share a correct detalis ")
}
res.send(dhamka[indexNumber])
}

// ====================================================================================================================\\

let films=[ {
    id : 1,
    name: "The Shining"
   }, {
    id: 2,
    name: "Incendies"
   }, {
    id: 3,
    name: "Rang de Basanti"
   }, {
    id: 4,
    name: "Finding Nemo"
   }]

   function number (req,res){
    return films
   }
   function moviesIndex(req,res){
    let moviesIndex =req.params.moviesIndex
    if(moviesIndex>films.length-1||moviesIndex<0){
        res.send("Please give us a valid number so we can able to share a correct detalis ")
    }
    res.send(films[moviesIndex])
    }










module.exports.movies=movies
module.exports.indexNumber=indexNumber
module.exports.number=number
module.exports.moviesIndex=moviesIndex
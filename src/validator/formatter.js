const { functions } = require('lodash');
const _ =require('lodash')

function trimToUpperToLower(){
const name1 = "      FunctionUp    "
console.log(name1.trim());
console.log(name1.toLowerCase());
console.log(name1.toUpperCase());




// const _ =require('lodash')

let month1=["January","February","March","April","May","June","july","August","September","October","November","December"];
console.log(_.chunk(month1,4))

const oddNum=[1,3,5,7,9,11,13,15,17,19];
console.log(_.tail(oddNum,9));

const Num=[2,5,4,2,7]
console.log(_.union(Num));

const keyValue=[['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']]

console.log(_.fromPairs(keyValue));

return "formatter"
}

module.exports.newFun=trimToUpperToLower
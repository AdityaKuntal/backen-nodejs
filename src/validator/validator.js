const mongoose = require("mongoose");

let isValidRequestBody = function (body) {
    console.log(isValidRequestBody)
    if (Object.keys(body).length === 0) return false;
    return true;
}

// let isValid =function(value){
//     if(typeof value=== 'undefined'||value===null)return false
//     if(typeof value === 'String'&& value.trim().length===0) return false;
//     return true;
// }




module.exports={isValidRequestBody}
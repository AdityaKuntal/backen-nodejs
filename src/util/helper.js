const { times } = require("lodash");

function timing() {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()+1
    console.log(`today date is ${day}`);
    console.log(`current month are ${month}`);
    return "time bhi set ho gya"
}


// const moment = require("moment");
  
// console.log(moment().format("MM/DD/YYYY HH:mm:ss"));


const getInfo={
    name:"Lithium",
    week:'W3D5',
    topic:'Todays Node js Topic -- How to create Module and Export it.',
}

function getBatchInfo(){
    console.log(`my batch is ${getInfo.name} , i have completed ${getInfo.week} , and ${getInfo.topic} `)
    return "application"
}

//getBatchInfo()


module.exports.getBatch=getBatchInfo
module.exports.time=timing

const userModel = require('../model/userModel')


let createUser = async (req, res) => {
    let userinfo = req.body
    let data = await userModel.create(userinfo)
    res.send({ newuser: data })

}


 module.exports.createUser=createUser








const letCheckIsFreeAppUser = async function(req,res,next){
    req.header["isFreeAppUser"]=req.header.isFreeAppUser
    let isFreeAppUser = req.header.isFreeAppUser
    if(isFreeAppUser){
        console.log(req.body)
        next()
    }
    
    else{
        res.send("request is missing a mandatory header")

    }

}

module.exports.mid1=letCheckIsFreeAppUser
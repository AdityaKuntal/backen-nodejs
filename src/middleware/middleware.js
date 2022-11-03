

const letCheckIsFreeAppUser = async function(req,res,next){               
   
        let data=req.headers
        let validinfo=data["isfreeappuser"]
        if(validinfo){
            if(validinfo=="true"){
                req.isfreeappuser=true
            }else{
                req.isfreeappuser=false
            }
            next();
        }else{
            res.send({data:"header missing"})
        }
        }



// let isFreeAppUser=req.headers.isfreeappuser;
//         if(isFreeAppUser){
//             req.body["isFreeAppUser"] = req.headers.isfreeappuser;

module.exports.mid1=letCheckIsFreeAppUser
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwtMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    if(token){
        try {
            const jwtResponse = jwt.verify(token,process.env.JWT_SECRET)
            req.role = jwtResponse.role
            req.payload = jwtResponse.email
            next()
        } catch (error) {
            res.status(404).json("Authorization failed!!! Invalid token")
        }
    }else{
        res.status(404).json("Authorization failed!!! Token Missing")
    }
}

module.exports = jwtMiddleware
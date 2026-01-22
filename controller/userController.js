const users = require('../model/userModel')
const bcrypt = require('bcrypt')

// register
exports.registerController = async (req,res)=>{
    console.log("Inside registerController");
    const {username,email,password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User Already Exists...Please Login!!!")
        }else{
            let encryptedPassword = await bcrypt.hash(password,10)
            const newUser = await users.create({
                username,email,password:encryptedPassword
            })
            res.status(200).json(newUser)
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
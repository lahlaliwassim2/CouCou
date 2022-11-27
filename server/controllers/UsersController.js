const User = require('../model/UserModel')
const brcrypt = require("bcrypt")
const { exists } = require('../model/UserModel')

module.exports.register = async(req,res,next) =>{

    try {
        const {username,email,password} = req.body
        const usernameCheck = await User.findOne({ username })
        if(usernameCheck){
            return res.json({msg : "nom dejas existe ", status: false})
        }
        const emailCheck = await User.findOne({ email })
        if(emailCheck){
            return res.json({msg:" email dejas existe" ,status: false})
        }
        const hashPassword = await brcrypt.hash(password,10)
        const user = await User.create({
            username,
            email,
            password:hashPassword
        })
        delete user.password
        return res.json({status:true, user})
    } catch (error) {
        next(error)
    }
}
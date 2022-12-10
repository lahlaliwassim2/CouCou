const User = require('../model/UserModel')
const brcrypt = require("bcrypt")
const { exists } = require('../model/UserModel')

module.exports.register = async(req,res,next) =>{

    try {
        const {username,email,password} = req.body
        const usernameCheck = await User.findOne({ username })
        if(usernameCheck){
            return res.json({msg : "nom dejas existe", status: false})
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
module.exports.login = async(req,res,next) =>{

    try {
        const {username,password} = req.body
        const user = await User.findOne({ username })
        if(!user){
            return res.json({msg:"incorect nom ou mot de passe",status:false})
        }

        const isPasswordValid = await brcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.json({msg:"incorect mot de passe",status:false})
        }
        delete user.password
        return res.json({status:true, user})
    } catch (error) {
        next(error)
    }
}
module.exports.setAvatar = async(req,res,next)=>{
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage
        });
        return res.json({isSet: userData.isAvatarImageSet,
                         image: userData.avatarImage
                        })
    } catch (error) {
        next(error)
    }
}
module.exports.allusers = async(req,res,next)=>{
    try {
        const users = await User.find({
            _id : {$ne : req.params.id}
        }).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        return res.json(users)
    } catch (error) {
     next(error)   
    }
}
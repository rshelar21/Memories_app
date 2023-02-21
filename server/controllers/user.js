const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel.js");

const signIn = async(req, res) => {
    const {email, password} = req.body;

    try {
        const result = await User.findOne({email})
        console.log(result)
        if(!result) return res.status(404).json({message : "User doesn't exist"})

        const isPassword = await bcrypt.compare(password, result.password)
        if(!isPassword) return res.status(404).json({message : "Invalid Password"})

        const token = await jwt.sign({email : result.email, id : result._id}, "test", {expiresIn : "1h"})
        console.log(token, 'token')
        res.status(200).json({ result, token})


    } catch(error) {
        res.status(500).json({message : "Something went wrong"})

    }

}


//up means frst time register karnar
const signUp = async(req, res) => {
    const {email, password, name} = req.body
    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(404).json({message : "User already exist"})

        const hashPass = await bcrypt.hash(password, 12)
        const result = await User.create({email, password : hashPass, name})

        const token = jwt.sign({email : result.email, id : result._id}, "test", {expiresIn : "1h"})

        res.status(200).json({result, token})

    } catch(error) {
        res.status(500).json({message : error})
    }
}



module.exports = {
    signIn,
    signUp
}
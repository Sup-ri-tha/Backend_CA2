const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const router = express.Router()
require('dotenv').config()

router.post('/login', async(req, res) => {
    const {email, password} = req.body
    if(!email)
        return res.status(400).json({message : "Email cannot be empty"})
    else if(!password)
        return res.status(400).json({message : "Password cannot be empty"})

    try{
        const user = await User.findOne({email})
        if(!user)
            return res.status(404).json({message : "User doesn't exist"})
        
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid)
            return res.status(400).json({message : "Invalid password!"})

        const token = jwt.sign({id : user._id, email : user.email}, process.env.SECRET_KEY, {expiresIn : '1h'})
        res.status(200).json({message : "User logged in successfully!", token})
    }
    catch(err){
        res.status(err.status || 500).json({message : err.message || "Error while trying to log in"})
    }
})

module.exports = router
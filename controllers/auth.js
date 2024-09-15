const Auth = require('../models/auth.js');
const bcrypt = require('bcrypt.js');
const jws = require('jsonwebtoken');
const register=async(req,res)=>{
    try {
        const {username, email, password}=req.body;
        const user = await Auth.findOne({email})

        if(user){
            return res.status(500).json({message:"Bu email heasbı zaten kullanımda..."});
        }

        if(password.length<6){
            return res.status(500).json({message:"Parolanız 6 karakterden küçük olamaz!!"});
        }
        const passwordHash = await bcrypt.hash(password,12);
        const newUser = await Auth.create({username, email, password:passwordHash});

        const userToken = await jwt.sign({id:newUser.id},proccess.env.SECRET_TOKEN,{expiresIn:'1h'});

        res
    } catch (error) {
        
    }
}
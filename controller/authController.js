const User = require('../models/user.model')
const bcryt =require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    signUp_get: (req,res)=>{
        res.send('signup get');
    },
    signUp_post: async(req,res)=> {
        const email = req.body.email;
        const salt = await bcryt.genSalt();
        const password = await bcryt.hash(req.body.password,salt);
        var user = {};
        try {
            user = await User.create({email, password});
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true});
            res.status(200).json({user:user._id});
        }
        
        catch (err) {
           const error = handleError(err);
           res.status(401).json(error)
        }
       
        
    },
    logout: (req,res)=> {
        res.cookie('jwt','',{maxAge:1});
        res.status(200).send("logout successfully");
    },
    login_post: async (req,res)=> {
        const { email, password} = req.body;
        try{
        const user = await findEmail(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true});
        res.status(200).json({user:user._id});
        }
        catch(err) {
            const errors = handleError(err);
            res.status(404).send(errors)
        }
    }
    
}
var handleError = (err)=>{
        let errors = { email: '', password: ''};
        if(err.code === 11000){
            errors['email']= 'Email exixts already!';
            return errors;
        }

        if(err.message.includes('wrong password')|| err.message.includes('user not found')){
            return 'Invalid credentials';
        }

        if(err.message.includes('user validation failed')){
            Object.values(err.errors).forEach(({properties})=>{
                errors[properties.path]= properties.message
            });
        }

        return errors;
    }
var createToken = (id) => {
    const payload= {id: JSON.stringify(id)};
    const token = jwt.sign(payload,'Secret santa',{ expiresIn:'1h'});
    return token;
}

var findEmail = async(email, password) => {
    const user = await User.findOne({email});
    if(user){
        const auth = await bcryt.compare(password, user.password);
        if(auth) {
            return user;
        }
         throw Error('wrong password');
    }
    throw Error('user not found');
}

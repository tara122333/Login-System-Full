const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    mobile:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    cpassword:{
        type:String,
        require:true,
    },
    tokens : [{
        user__token:{
            type : String,
            required : true
        }
    }]

});

UserSchema.methods.generateAuthToken = async function(){
    try {
        const token = await jwt.sign({
            _id : this._id.toString(),
        },
        "mynameistarachandkumawattaraisgo"
        );
        this.tokens = this.tokens.concat({user__token:token});
        return token;
    } catch (error) {
        console.log("Token error is "+error);
    }
    
}

UserSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    bcrypt.genSalt(8,(err,salt)=>{
        if(err) return next(salt);
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err) return next(err);
            user.password = hash;
            user.cpassword = undefined;
            return next();
        })
    })
});

const UserModel = mongoose.model("users",UserSchema);

module.exports = UserModel;
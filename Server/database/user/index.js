const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    usermail:{
        type:String,
        require:true,
    },
    usernumber:{
        type:Number,
        require:true,
    },
    userpassword:{
        type:String,
        require:true,
    },
    userconfirmpassword:{
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

UserSchema.statics.userShouldNotExist = async (usermail) => {
    const user = await UserModel.findOne({ usermail});
    if (user) throw new Error("User Already exist.");
    return false;
  };
  

UserSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("userpassword")) return next();
    bcrypt.genSalt(8,(err,salt)=>{
        if(err) return next(err);
        bcrypt.hash(user.userpassword,salt,(err,hash)=>{
            if(err) return next(err);
            user.userpassword = hash;
            user.userconfirmpassword = undefined;
            console.log(user.userpassword);
            return next();
        })
    })
});

const UserModel = mongoose.model("users",UserSchema);

module.exports = UserModel;
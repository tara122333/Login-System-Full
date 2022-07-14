const express = require("express");
require("./database/conn");
let UserModel = require("./database/user/index");
const bcrypt = require("bcryptjs");
const cors = require("cors");


const PORT = 4000;


const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.get("/",(req,res)=>{
    res.json({Message : "Success"});

});

app.post("/login",async(req,res)=>{
    try {
        const usermail = req.body.usermail;
        const userpassword = req.body.userpassword;
        const checkEmail = await UserModel.findOne({usermail});
        if(checkEmail){
            const checkPassword =  await bcrypt.compare(userpassword,checkEmail.userpassword);
            console.log(checkPassword);
            if(checkPassword){
                const token = await checkEmail.generateAuthToken();
                return res.status(200).json({token : token});
            }
            else{
                return res.status(404).json({"error : " : "password does not match"});
            }
        }
        else{
            return res.status(404).json({"error : " : "email does not match"});
        }
        
    } catch (error) {
        return res.status(500).json({message : error});
    }
    

});

app.post("/signup",async(req,res)=>{
    try {
        const userpassword = req.body.userpassword;
        const usermail = req.body.usermail;
        const userconfirmpassword= req.body.userconfirmpassword;
        const chekMail = await UserModel.findOne({usermail});
        console.log(chekMail);
        
        if(!chekMail){
            console.log("user not found");
            if(userpassword===userconfirmpassword){
                console.log("password is same");
                const userForm = new UserModel({
                    username : req.body.username,
                    usermail : req.body.usermail,
                    usernumber : req.body.usernumber,
                    userpassword:req.body.userpassword,
                    userconfirmpassword : req.body.userconfirmpassword,

                });
                console.log("schema is created");
                const token = await userForm.generateAuthToken();
                const user = await userForm.save();
                console.log(token);
                console.log(user);
                return res.status(200).json({
                        user,token
                });
            }
            else{
                return res.status(202).json({"message" : "password does not match"});
            }
        }
        else{
            return res.status(404).json({error : "user already exist"});
        }
    } catch (error) {
        return res.status(500).json({message : "catched error message"});
    }
    

});

app.listen(PORT,(error)=>{
    if(!error){
        console.log("server has been started on port 4000");
    }
    else{
        console.log("error is "+ error);
    }
})

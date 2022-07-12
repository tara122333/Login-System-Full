const express = require("express");
require("./database/conn");
const UserModel = require("./database/user/index");
const bcrypt = require("bcryptjs");


const PORT = 4000;


const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/",(req,res)=>{
    res.json({Message : "Success"});

});

app.get("/user",async(req,res)=>{

});

app.post("/login",async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const checkEmail = await UserModel.findOne({email});
        if(checkEmail){
            const checkPassword = await bcrypt.compare(password,checkEmail.password);
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
        const password = req.body.password;
        const email = req.body.email;
        const cpassword = req.body.cpassword;
        const chekMail = await UserModel.findOne({email:email});
        if(!chekMail){
            if(password===cpassword){
                const userForm = new UserModel({
                    fullname : req.body.fullname,
                    email : req.body.email,
                    mobile : req.body.mobile,
                    password:req.body.password,
                    cpassword : req.body.cpassword,
                });
                const token = await userForm.generateAuthToken();
                const user = await userForm.save();
                return res.json({
                        token,user
                });
            }
            else{
                return res.json({"message" : "password does not match"});
            }
        }
        else{
            return res.json({error : "user already exist"});
        }
    } catch (error) {
        return res.status(500).json({message : error});
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

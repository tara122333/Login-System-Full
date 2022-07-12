const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/UserData",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("database has been connected success bros and sis.........");
}).catch(()=>{
    console.log("database not connet and error is "+ error);
})
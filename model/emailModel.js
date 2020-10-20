const mongoose=require('mongoose')
var userSchema = new mongoose.Schema({
    name:String,
    email:{type:String,required: true}, //, unique:true NOTE : The sparse property in email , is what tells my database to allow null values which will later be filled with unique values 
    message:String,
    authToken: { type: String, required:true},
    isAuthenticated: { type: Boolean, required:true }
});

var Email = mongoose.model('Email', userSchema);
module.exports=Email;
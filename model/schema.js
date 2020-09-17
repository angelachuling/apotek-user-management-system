const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    uFname: String,
        uSname: String,
        uAddress: String,
        uname: String,
        email: String,
        pswd: String,
        role: String,
        remember: String
});
const users=mongoose.model('User',userSchema);

module.exports=users;
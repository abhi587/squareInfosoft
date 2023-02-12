const mongoose = require('mongoose')

const validEmail = function(email){
    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(email)
}

const userSchema = new mongoose.Schema({

    email :{
        type     : String,
        required : [true, "email address must be provided"],
        trim     : true,
        lowercase: true,
        validate : [validEmail, "enter a valid email address"]
    },
    password :{
        type     : String,
        required : [true, "password must be provided"]
    },
    name :{
        type     : String,
        required : [true, "User name must be provided"],
        trim     : true
    },
    dob : {
        type     : Date,
        required  : [true, "DOB must be provided"]
    },
    isDeleted : {
        type : Boolean,
        default : false
    }

}, {timestamps : true})


module.exports = mongoose.model("User", userSchema)
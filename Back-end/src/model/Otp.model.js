import mongoose from 'mongoose'

const OTPSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    OTP : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 60
    }
})

export const OTPModel = mongoose.model('OTP',OTPSchema)
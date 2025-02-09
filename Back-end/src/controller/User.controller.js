import { UserModel } from "../model/User.Model.js"
import { OTPModel } from '../model/Otp.model.js'

const Registration = async (req, res) => {
    try {
        const { email, username, password , otp } = req.body

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'All fields are Required!' })
        }

        const CheckUser = await UserModel.findOne({
            email
        })

        if (CheckUser) {
            return res.status(400).json({ message: 'email already exist try another one' })
        }

        const CheckOTP = await OTPModel.findOne({
            email
        })

        if (!CheckOTP || !CheckOTP.OTP) {
            return res.status(400).json({ message: 'OTP is expired or not sent' });
        }

        if(String(CheckOTP.OTP) !== String(otp)){
            return res.status(400).json({ message: 'invalid OTP' })
        }

        const NewUser = new UserModel({
            email,
            username,
            password
        })

        NewUser.save()
        return res.status(200).json({ message: 'Registration Succesfully' })

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const Login = async (req, res) => {
    try {
        const { EmailOrUsername, password } = req.body

        if(!EmailOrUsername){
            return res.status(400).json({ message: 'email or username is required' })
        }

        if(!password){
            return res.status(400).json({ message: 'password is required' })
        }

        const FindEmailOrUsername = await UserModel.findOne({
            $or: [{ email: EmailOrUsername }, { username: EmailOrUsername }]
        })

        if(!FindEmailOrUsername){
            return res.status(400).json({ message: 'User not exist' })
        }

        const CheckPassword = await FindEmailOrUsername.CheckPassword(password)

        if(!CheckPassword){
            return res.status(400).json({ message: 'Invalid password!' })
        }

        const GetCookies = await FindEmailOrUsername.GenerateToken()
        const IsLogin = await UserModel.findById(FindEmailOrUsername._id).select('-password')

        const Option = {
            httpOnly : false,
            secure: true,
            sameSite: 'none'
        }

        res.cookie('user-cookies',GetCookies,Option)
        return res.status(200).json({ message: 'Success' , IsLogin })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

export {
    Registration,
    Login
}
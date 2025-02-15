import { UserModel } from "../model/User.Model.js"
import { OTPModel } from '../model/Otp.model.js'
import { SellerModel } from "../model/Seller.model.js";

const Registration = async (req, res) => {
    try {
        let { email, username, password, otp } = req.body

        email = email.trim()
        username = username.trim()
        password = password.trim()

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

        if (String(CheckOTP.OTP) !== String(otp)) {
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
        let { EmailOrUsername, password } = req.body

        EmailOrUsername = EmailOrUsername.trim()
        password = password.trim()

        if (!EmailOrUsername) {
            return res.status(400).json({ message: 'email or username is required' })
        }

        if (!password) {
            return res.status(400).json({ message: 'password is required' })
        }

        const FindEmailOrUsername = await UserModel.findOne({
            $or: [{ email: EmailOrUsername }, { username: EmailOrUsername }]
        })

        if (!FindEmailOrUsername) {
            return res.status(400).json({ message: 'User not exist' })
        }

        const CheckPassword = await FindEmailOrUsername.CheckPassword(password)

        if (!CheckPassword) {
            return res.status(400).json({ message: 'Invalid password!' })
        }

        const GetCookies = await FindEmailOrUsername.GenerateToken()
        const IsLogin = await UserModel.findById(FindEmailOrUsername._id).select('-password')

        const Option = {
            httpOnly: false,
            secure: true,
            sameSite: 'none'
        }

        res.cookie('user-cookies', GetCookies, Option)
        return res.status(200).json({
            message: 'User logged in successfully',
            IsLogin
        })

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const GetUserData = async (req, res) => {
    try {
        const user = req.user
        let Seller = null
        if (user.isSeller) {
            Seller = await SellerModel.findOne({ user_id: user._id })
                .select('-bank_number -gst_number -password')
        }

        return res.status(200).json({
            message: 'User data fetch successfully',
            user,
            Seller
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

export {
    Registration,
    Login,
    GetUserData
}
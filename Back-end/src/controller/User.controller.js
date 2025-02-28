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
        console.log(error)
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
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("user-cookies", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return res.status(200).json({ message: "Logout Successfully" })

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const UpdateUsername = async (req, res) => {
    try {
        const userid = req.user._id
        const { username, gender } = req.body

        const user = await UserModel.findOne({ _id: userid })
        if (!user) {
            return res.status(400).json({ message: "User don't Exist" })
        }

        if (username) {
            user.username = username
        }
        if (gender) {
            user.gender = gender
        }

        await user.save()
        return res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const UpdateNumber = async (req, res) => {
    try {
        const userid = req.user._id
        const { number } = req.body
        const user = await UserModel.findOne({ _id: userid })
        if (!user) {
            return res.status(400).json({ message: "User don't Exist" })
        }

        if (!number || number.length !== 10) {
            return res.status(400).json({ message: "Mobile number should be 10 digits" });
        }

        user.number = number
        await user.save()
        return res.status(200).json({ message: "User updated successfully", user });

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const UpdateEmail = async (req, res) => {
    try {
        const user = req.user._id
        const { email , otp } = req.body
        console.log(req.body)
        
        const CheckOTP = await OTPModel.findOne({
            email
        })

        if (!CheckOTP || !CheckOTP.OTP) {
            return res.status(400).json({ message: 'OTP is expired or not sent' });
        }

        if (String(CheckOTP.OTP) !== String(otp)) {
            return res.status(400).json({ message: 'invalid OTP' })
        }

        const Finduser = await UserModel.findById(user)

        Finduser.email = email
        Finduser.save()

        return res.status(200).json({ message: 'Email Updated Succesfully' })

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

export {
    Registration,
    Login,
    GetUserData,
    logout,
    UpdateUsername,
    UpdateNumber,
    UpdateEmail
}
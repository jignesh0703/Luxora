import { SellerModel } from "../model/Seller.model.js";

const RegistorSeller = async (req, res) => {
    try {
        const { fullname, number, email, bank_number, gst_number, password } = req.body;
        if (!fullname || !number || !email || !bank_number || !gst_number || !password) {
            return res.status(400).json({ message: 'All fields are Required!' })
        }

        const CheckNumber = await SellerModel.findOne({
            number
        })

        if (CheckNumber) {
            return res.status(400).json({ message: 'Number is Already Used!' })
        }

        const CheckEmail = await SellerModel.findOne({
            email
        })

        if (CheckEmail) {
            return res.status(400).json({ message: 'Email is Already Used!' })
        }

        if (number.length !== 10) {
            return res.status(400).json({ message: 'Mobile Number must be 10 digits' })
        }

        if (bank_number.length < 9 || bank_number.length > 18) {
            return res.status(400).json({ message: 'Bank Number must be between 9 and 18 digits' })
        }

        if (gst_number.length !== 15) {
            return res.status(400).json({ message: 'GST Number must be exactly 15 digits' })
        }

        if (password.lenght > 8) {
            return res.status(400).json({ message: 'Password must be more than 8 characters' })
        }

        const addSeller = new SellerModel({
            fullname,
            number,
            email,
            bank_number,
            gst_number,
            password
        })

        await addSeller.save()
        return res.status(200).json({ message: 'Registration Succesfully!' })

    } catch (error) {
        return res.status(500).json({ message: 'Somthing wrong try again!' })
    }
}

const Login = async (req, res) => {
    try {
        const { EmailAndNumber, password } = req.body

        if(!EmailAndNumber){
            return res.status(400).json({ message: "email or number is required" })
        }

        const CheckUser = await SellerModel.findOne({
            $or: [{ email : EmailAndNumber }, { number : EmailAndNumber }]
        })

        if (!CheckUser) {
            return res.status(500).json({ message: "User don't exist" })
        }

        if(!password){
            return res.status(400).json({ message: "Password is required" })
        }

        const isPasswordValid = await CheckUser.CheckPassword(password)

        if(!isPasswordValid){
            return res.status(400).json({ message: "invalid password" })
        }

        const JWTToken = await CheckUser.GenerateToken()

        const IsLogin = await SellerModel.findById(CheckUser).select("-password -bank_number -gst_number")

        const Option = {
            httpOnly : true,
            secure: true,
            sameSite: 'none'
        }

        res.cookie('Token',JWTToken,Option)

        return res.status(200).json({
            message: "User logged in successfully",
            IsLogin,
            JWTToken
        })

    } catch (error) {
        return res.status(500).json({ message: 'Somthing wrong try again!' })
    }
}

export {
    RegistorSeller,
    Login
}
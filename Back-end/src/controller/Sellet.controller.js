import { SellerModel } from "../model/Seller.model.js";
import { UserModel } from "../model/User.Model.js";
import bcrypt from 'bcrypt'

const RegistorSeller = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(400).json({ message: 'Login is Required!' })
        }

        let { fullname, number, email, bank_number, gst_number, password } = req.body;

        fullname = fullname.trim();
        number = number.trim();
        email = email.trim().toLowerCase();
        bank_number = bank_number.trim();
        gst_number = gst_number.trim();
        password = password.trim();

        if (!fullname || !number || !email || !bank_number || !gst_number || !password) {
            return res.status(400).json({ message: 'All fields are Required!' })
        }

        const CheckNumber = await SellerModel.findOne({ number })
        if (CheckNumber) {
            return res.status(400).json({ message: 'Number is Already Used!' })
        }

        const CheckEmail = await SellerModel.findOne({ email })
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

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be more than 8 characters' })
        }

        const FindUser = await UserModel.findById(user._id)

        const isPasswordMatch = await bcrypt.compare(password, FindUser.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        await FindUser.updateOne({ isSeller: true })

        const addSeller = new SellerModel({
            fullname,
            number,
            email,
            bank_number,
            gst_number,
            password,
            user_id: user._id
        })

        await addSeller.save()
        return res.status(200).json({ message: 'Registration Succesfully to Seller Account!' })

    } catch (error) {
        return res.status(500).json({ message: 'Somthing wrong try again!' })
    }
}

const Updatedata = async (req, res) => {
    try {
        const user = req.user._id
        const { fullname, number, email } = req.body

        const FindSeller = await SellerModel.findOne({ user_id: user })
        if (!FindSeller) {
            return res.status(404).json({ message: 'Seller not found!' });
        }

        if (fullname) {
            FindSeller.fullname = fullname
        }

        if (number) {
            FindSeller.number = number
        }

        if (email) {
            FindSeller.email = email
        }

        await FindSeller.save()
        return res.status(200).json({ message: 'Profile updated successfully', seller: FindSeller });

    } catch (error) {
        return res.status(500).json({ message: 'Somthing wrong try again!' })
    }
}

export {
    RegistorSeller,
    Updatedata
}
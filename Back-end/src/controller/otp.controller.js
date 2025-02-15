import { GenerateOTP, SendOTP } from '../utils/OTP.service.js'
import { OTPModel } from '../model/Otp.model.js';

const SendOTPUser = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = await GenerateOTP();

    const response = await SendOTP(email, otp);
    if (response.message) {
        res.json({ message: "OTP sent to email" });
    } else {
        res.status(500).json({ message: response.message });
    }

    const FindEmail = await OTPModel.findOne({
        email: email
    })

    if (FindEmail) {
        await OTPModel.findOneAndUpdate(
            { email: email },
            { OTP: otp, createdAt: Date.now() },
            { upsert: true, new: true }
        );
    } else {
        const NEWOTP = new OTPModel({
            email: email,
            OTP: otp
        })
        await NEWOTP.save()
    }
}

export {
    SendOTPUser
}
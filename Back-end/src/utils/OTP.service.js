import nodemailer from 'nodemailer'
import crypto from 'crypto'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const GenerateOTP = async () => {
    return crypto.randomInt(100000, 999999).toString()
}

const SendOTP = async (email, otp) => {
    console.log(`email : ${email}, OTP : ${otp}`)
    const MailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject : 'Luxora - confirmation code',
        text : `hello your OTP is ${otp} , it will be expire in 10 minutes`
    }
    try {
        await transporter.sendMail(MailOption)
        return { message: "OTP sent successfully!" };
    } catch (error) {
        return { message: "Failed to send OTP", error };
    }
}

export {
    GenerateOTP,
    SendOTP
}
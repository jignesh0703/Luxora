import express from 'express'
import { SendOTPUser } from '../controller/otp.controller.js'

const OTPRoutes = express.Router()

OTPRoutes.post('/send-otp',SendOTPUser)

export default OTPRoutes
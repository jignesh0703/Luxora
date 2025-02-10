import jwt from 'jsonwebtoken'
import { UserModel } from '../model/User.Model.js'

const JWTVerify = async (req,res,next) => {
    try {
        const token = req.cookies?.["user-cookies"]

        if(!token){
            return res.status(400).json({ message: "Login is Required" });
        }

        const CheckToken = await jwt.verify(token,process.env.USER_TOKEN_SECRET)

        const User = await UserModel.findById(CheckToken?._id).select("-password ")

        if (!User) {
            return res.status(400).json({ message: "Invalid Token: User not found" });
        }

        req.user = User
        next()
    } catch (error) {
        return res.status(400).json({ message: "Invalid access token" });
    }
}

export default JWTVerify
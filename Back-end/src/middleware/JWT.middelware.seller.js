import jwt from 'jsonwebtoken'
import { SellerModel } from '../model/Seller.model.js';

const JWTVerify = async (req,res,next) => {
    try {
        const token = req.cookies?.Token

        if(!token){
            return res.status(400).json({ message: "Login is Required" });
        }

        const CheckToken = await jwt.verify(token,process.env.TOKEN_SECRET)

        const Seller = await SellerModel.findById(CheckToken?._id).select("-password -bank_number -gst_number")

        if (!Seller) {
            return res.status(400).json({ message: "Invalid Token: User not found" });
        }

        req.seller = Seller
        next()

    } catch (error) {
        return res.status(400).json({ message: "Invalid access token" });
    }
}

export default JWTVerify
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SellerSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        bank_number: {
            type: String,
            required: true
        },
        gst_number: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

SellerSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10),
        next()
})

SellerSchema.methods.CheckPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

SellerSchema.methods.GenerateToken = async function () {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn : process.env.TOKEN_EXPIRY
        }
    )
}

export const SellerModel = mongoose.model('Seller', SellerSchema)
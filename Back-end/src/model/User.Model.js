import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.CheckPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.GenerateToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.USER_TOKEN_SECRET,
        {
            expiresIn: process.env.USER_TOKEN_EXPIRY
        }
    )

}

export const UserModel = mongoose.model('user', UserSchema)
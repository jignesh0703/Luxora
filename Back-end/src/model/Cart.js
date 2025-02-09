import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        Products: [
            {
                product_id: mongoose.Types.ObjectId,
                ref: 'Product'
            }
        ]
    },
    {
        timestamps: true
    }
)

export const CartModel = mongoose.model('cart', CartSchema)
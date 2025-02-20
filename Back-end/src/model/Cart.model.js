import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        Products: [
            {
                product_id: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

export const CartModel = mongoose.model('cart', CartSchema)
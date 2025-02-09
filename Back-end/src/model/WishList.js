import mongoose from 'mongoose'

const WishListSchema = new mongoose.Schema(
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

export const WishListModel = mongoose.model('wishlist', WishListSchema)
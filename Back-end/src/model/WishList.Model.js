import mongoose from 'mongoose'

const WishListSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        Products: [
            {
                product_id: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Product',
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

export const WishListModel = mongoose.model('wishlist', WishListSchema)
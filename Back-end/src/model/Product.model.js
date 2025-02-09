import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        offer_price: {
            type: Number
        },
        category: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        images: [
            {
                type: String,
                required: true
            }
        ],
        seller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

export const ProductModel = mongoose.model('Product', ProductSchema)
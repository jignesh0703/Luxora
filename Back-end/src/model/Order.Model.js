import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true
        },
        products: {
            product_id: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
        address: {
            type: mongoose.Types.ObjectId,
            ref: 'addresh',
            required: true
        },
        total_price: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending"
        },
        orderStatus: {
            type: String,
            enum: ["Processing", "Shipped", "OutForDelivery", "Delivered", "Cancelled"],
            default: 'Processing'
        },
        seller_id : {
            type : mongoose.Types.ObjectId,
            ref : 'User',
            required : true
        }
    },
    {
        timestamps: true
    }
)

export const OrderModel = mongoose.model('order', OrderSchema)
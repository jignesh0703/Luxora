import mongoose from 'mongoose'

const RateSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    }
})

export const RateModel = mongoose.model('rating', RateSchema)
import mongoose from 'mongoose'

const AddressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    address: [
        {
            name: {
                type: String,
                required: true
            },
            number: {
                type: Number,
                required: true
            },
            pincode: {
                type: Number,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            address_type: {
                type: String,
                required: true
            }
        }
    ]
})

export const AddreshModel = mongoose.model('addresh', AddressSchema)
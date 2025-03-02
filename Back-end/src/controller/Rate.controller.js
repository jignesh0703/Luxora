import { OrderModel } from "../model/Order.Model.js"
import { RateModel } from "../model/Rating.model.js"

const AddRating = async (req, res) => {
    try {
        const user = req.user._id
        let product_id = req.params.product_id
        product_id = product_id.replace(/^:/, '')
        const { review } = req.body

        const FindUserOrder = await OrderModel.findOne({
            user_id: user,
            "products.product_id": product_id
        })

        if (!FindUserOrder) {
            return res.status(400).json({ message: "Don't buyed this product" })
        }

        if (!review) {
            return res.status(400).json({ message: "review is Required" })
        }

        const newRate = RateModel({
            user_id: user,
            product_id: product_id,
            review: review
        })

        await newRate.save()
        return res.status(200).json({ message: 'Review added successfully' })

    } catch (error) {
        return res.status(500).json({ message: 'Somthing wrong try again!' })
    }
}

const GetProductAllRating = async (req, res) => {
    try {
        let product_id = req.params.product_id
        product_id = product_id.replace(/^:/, '')

        const FindproductReview = await RateModel.find({ product_id: product_id })
            .populate('user_id', 'username')

        return res.status(200).json({ message: 'All Reviews Fetch successfully', FindproductReview })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Somthing wrong try again!' })
    }
}

const GetUserAllReviews = async (req, res) => {
    try {
        const user = req.user._id

        const FindReviews = await RateModel.find({ user_id: user })

        return res.status(200).json({ message: 'All Reviews Fetch successfully', FindReviews })

    } catch (error) {
        return res.status(500).json({ message: 'Somthing wrong try again!' })
    }
}

export {
    AddRating,
    GetProductAllRating,
    GetUserAllReviews
}
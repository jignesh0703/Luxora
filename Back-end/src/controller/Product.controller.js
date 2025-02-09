import { ProductModel } from "../model/Product.model.js";
import UploadOnCloudinary from "../utils/Cloudinary.js";
import { v2 as cloudinary } from 'cloudinary';

const AddProduct = async (req, res) => {
    try {
        const { name, description, price, offer_price, category, stock } = req.body
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ message: "All Feilds are Required!" })
        }

        const images = req.files.image || []
        const video = req.files.video || []

        if (images.length === 0) {
            return res.status(400).json({ message: "Images are Required!" })
        }

        if (images.length < 4 || images.length > 7) {
            return res.status(400).json({ message: "Images must be between 4 to 7" })
        }

        if (video.length > 1) {
            return res.status(400).json({ message: "Video must be only 1" })
        }

        const uploadedImages = await Promise.all(
            images.map((image, index) =>
                UploadOnCloudinary(image.buffer, `product_images/${Date.now()}_${index}`, 'image')
                    .then(upload => upload.secure_url)
            )
        );

        if (video.length === 1) {
            const UploadVideo = await UploadOnCloudinary(video[0].buffer, `product_video/${Date.now()}`, 'video')
            if (UploadVideo && UploadVideo.secure_url) {
                uploadedImages.push(UploadVideo.secure_url)
            }
        }

        const user_id = req.seller?._id
        if (!user_id) {
            return res.status(400).json({ message: "User is not logined!" })
        }

        const addproduct = new ProductModel({
            name,
            description,
            price,
            offer_price,
            category,
            stock,
            seller_id: user_id,
            images: uploadedImages
        })

        await addproduct.save()
        return res.status(200).json({ addproduct, message: 'Product added Succesfully!' })

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const DeleteProduct = async (req, res) => {
    try {
        const user_id = req.seller._id

        let { product_id } = req.params
        product_id = product_id.replace(/^:/, '')

        const FindProduct = await ProductModel.findById(product_id)

        if (!FindProduct) {
            return res.status(400).json({ message: "Product don't found" })
        }

        if (FindProduct.seller_id.toString() !== user_id.toString()) {
            return res.status(400).json({ message: "You are not allowed to delete product" })
        }

        if (FindProduct.images.length > 0) {
            FindProduct.images.map(async (imgURL) => {
                const filename = imgURL.split("/").pop().split('.')[0]
                if (imgURL.includes('product_images')) {
                    const publicid = (`product_images/${filename}`)
                    await cloudinary.uploader.destroy(publicid)
                } else if (imgURL.includes('product_video')) {
                    const publicid = (`product_video/${filename}`)
                    await cloudinary.uploader.destroy(publicid, { resource_type: "video" })
                }
            })
        }

        await ProductModel.findByIdAndDelete(product_id)

        return res.status(200).json({ message: 'Product deleted Succesfully!' })

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const GetAllProduct = async (req, res) => {
    try {

        let page = parseInt(req.query.page) || 1;
        let limit = 20
        let skip = (page - 1) * 20

        const GetData = await ProductModel.find()
            .skip(skip)
            .limit(limit)

        const TotalProduct = await ProductModel.countDocuments()
        const TotalPages = Math.ceil(TotalProduct / limit)

        return res
            .status(200)
            .json({
                message: 'data fetched Product',
                TotalProduct,
                TotalPages,
                products: GetData
            })

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while fetching videos." })
    }
}

const GetIndivisualProduct = async (req, res) => {
    try {
        let product_id = req.params.product_id
        product_id = product_id.replace(/^:/, '')

        const FindProduct = await ProductModel.findById(product_id)

        if (!FindProduct) {
            return res.status(400).json({ message: "Product don't found!!" })
        }

        return res.status(200).json({ message: 'Product fetch Succesfully!', FindProduct })

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

export {
    AddProduct,
    DeleteProduct,
    GetAllProduct,
    GetIndivisualProduct
}
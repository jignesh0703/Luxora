import { ProductModel } from "../model/Product.model.js";
import UploadOnCloudinary from "../utils/Cloudinary.js";
import { v2 as cloudinary } from 'cloudinary';
import { UserModel } from "../model/User.Model.js"

const AddProduct = async (req, res) => {
    try {
        const seller_id = req.user?._id;

        const FindUserHaveSellerAccount = await UserModel.findById(seller_id)
        if (!FindUserHaveSellerAccount.isSeller) {
            return res.status(400).json({ message: "Dont have seller account!" });
        }

        const { name, description, price, offer_price, stock } = req.body;

        if (!name || !description || !price || !stock) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if (!req.files || !req.files.images || req.files.images.length === 0) {
            return res.status(400).json({ message: "Images are required!" });
        }

        const images = req.files.images;

        if (images.length < 4 || images.length > 7) {
            return res.status(400).json({ message: "Images must be between 4 and 7." });
        }

        const uploadedImages = await Promise.all(
            images.map((image, index) =>
                UploadOnCloudinary(image.buffer, `product_images/${Date.now()}_${index}`, 'image')
                    .then(upload => upload.secure_url)
            )
        );

        if (!seller_id) {
            return res.status(400).json({ message: "User is not logged in!" });
        }

        const addProduct = new ProductModel({
            name,
            description,
            price,
            offer_price,
            stock,
            seller_id,
            images: uploadedImages
        });

        await addProduct.save();
        return res.status(200).json({ addProduct, message: "Product added successfully!" });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, try again!" });
    }
};

const DeleteProduct = async (req, res) => {
    try {
        const user_id = req.user._id

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

const UpdateProduct = async (req, res) => {
    try {
        const user_id = req.user._id

        let { product_id } = req.params
        product_id = product_id.replace(/^:/, '')

        const FindProduct = await ProductModel.findById(product_id)

        if (!FindProduct) {
            return res.status(400).json({ message: "Product don't found" })
        }

        if (FindProduct.seller_id.toString() !== user_id.toString()) {
            return res.status(400).json({ message: "You are not allowed to delete product" })
        }

        const UpdateData = {}
        const { name, description, price, offer_price, stock } = req.body

        if (name) UpdateData.name = name;
        if (description) UpdateData.description = description;
        if (price) UpdateData.price = price;
        if (offer_price) UpdateData.offer_price = offer_price;
        if (stock) UpdateData.stock = stock;

        await ProductModel.findByIdAndUpdate(product_id, UpdateData, { new: true })

        return res.status(200).json({ message: 'Product Updated Succesfully!' })

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
        return res.status(500).json({ message: "Something went wrong while fetching products." })
    }
}

const GetSellerAllProduct = async (req, res) => {
    try {
        const user = req.user
        if (!user.isSeller) {
            return res.status(400).json({ message: "don't found Seller account" })
        }

        const FindProducts = await ProductModel.find({
            seller_id: user._id
        })
            .select('-images')
            .sort({ _id: -1 });

        return res
            .status(200)
            .json({
                message: 'data fetched Product',
                ProductCount: FindProducts.length,
                FindProducts
            })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while fetching products." })
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
    UpdateProduct,
    GetAllProduct,
    GetSellerAllProduct,
    GetIndivisualProduct
}
import { WishListModel } from '../model/WishList.Model.js'

const ToggleWishList = async (req, res) => {
    try {
        const userid = req.user._id
        const productid = req.params.productid

        let wishlist = await WishListModel.findOne({ user_id: userid });
        if (!wishlist) {
            const WishList = new WishListModel({
                user_id: userid,
                Products: [{ product_id: productid }]
            })
            await WishList.save()
            return res.status(200).json({ message: 'Added to Wishlist', inWishlist: true });
        }

        const FindProduct = wishlist.Products.findIndex(p => p.product_id.toString() === productid.toString())

        if (FindProduct === -1) {
            wishlist.Products.push({ product_id: productid })
            await wishlist.save()
            return res.status(200).json({ message: 'Added to Wishlist', inWishlist: true });
        } else {
            wishlist.Products.splice(FindProduct, 1)
            if (wishlist.Products.length === 0) {
                await wishlist.deleteOne()
                return res.status(200).json({ message: 'Removed from Wishlist', inWishlist: false });
            } else {
                await wishlist.save();
                return res.status(200).json({ message: 'Removed from Wishlist', inWishlist: false });
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong!" })
    }
}

const CheckAlready = async (req, res) => {
    try {
        const userid = req.user._id
        const productid = req.params.productid

        let wishlist = await WishListModel.findOne({ user_id: userid });
        if (!wishlist) {
            return res.status(200).json({ inWishlist: false });
        }

        const FindProduct = wishlist.Products.findIndex(p => p.product_id.toString() === productid.toString())
        if (FindProduct === -1) {
            return res.status(200).json({ inWishlist: false })
        } else {
            return res.status(200).json({ inWishlist: true })
        }

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" })
    }
}

const FetchAll = async (req, res) => {
    try {
        const userid = req.user._id

        let wishlist = await WishListModel.findOne({ user_id: userid }).populate('Products.product_id', '_id images name price offer_price')

        if (!wishlist) {
            return res.status(400).json({ message: "User Don't Exist!" })
        }

        return res.status(200).json({ message: "WishList Fetch Succesfuly", wishlist })

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" })

    }
}

const RemoveWishList = async (req, res) => {
    try {
        const userid = req.user._id
        let productid = req.params.productid
        productid = productid.replace(/^:/, '')

        let wishlist = await WishListModel.findOne({ user_id: userid });

        if (!wishlist) {
            return res.status(400).json({ message: "User Don't Exist!" })
        }

        const FindProduct = wishlist.Products.findIndex(p => p._id.toString() === productid);

        if (FindProduct === -1) {
            return res.status(400).json({ message: "Product Not Found in Wishlist!" });
        }

        wishlist.Products.splice(FindProduct, 1);

        if (wishlist.Products.length === 0) {
            await wishlist.deleteOne()
            return res.status(200).json({ message: "Product removed from Wishlist" });
        } else {
            await wishlist.save()
            return res.status(200).json({ message: "Product removed from Wishlist" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" })
    }
}

export {
    ToggleWishList,
    CheckAlready,
    FetchAll,
    RemoveWishList
}
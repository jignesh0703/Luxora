import { CartModel } from "../model/Cart.model.js"

const AddToCart = async (req, res) => {
    try {
        const user = req.user._id
        const productid = req.params.productid

        const FindUser = await CartModel.findOne({ user_id: user })

        if (!FindUser) {
            const cart = new CartModel({
                user_id: user,
                Products: [
                    {
                        product_id: productid,
                        quantity: 1
                    }
                ]
            })
            await cart.save()
            return res.status(200).json({ message: 'Products Added To Cart', Alreadyin: true })
        } else {
            const productExists = FindUser.Products.some(
                (item) => item.product_id.toString() === productid.toString()
            );

            if (!productExists) {
                FindUser.Products.push({ product_id: productid, quantity: 1 });
                await FindUser.save();
                return res.status(200).json({ message: "Product added to cart!", Alreadyin: true });
            } else {
                return res.status(200).json({ message: "Product is Already in cart!", Alreadyin: true });
            }

        }

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const RemoveToCart = async (req, res) => {
    try {
        const user = req.user._id
        const productid = req.params.productid

        const FindUser = await CartModel.findOne({ user_id: user })

        if (FindUser) {
            const FindIndex = FindUser.Products.findIndex(p => p.product_id.toString() === productid)

            if (FindIndex !== -1) {
                FindUser.Products.splice(FindIndex, 1)
                await FindUser.save()
                return res.status(200).json({ message: "Product removed successfully", FindUser });
            } else {
                return res.status(404).json({ message: "Product not found in cart" });
            }
        }

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const IncreaseQuantity = async (req, res) => {
    try {
        const user = req.user._id
        const productid = req.params.productid

        const FindUser = await CartModel.findOne({ user_id: user })

        if (!FindUser) {
            return res.status(404).json({ message: "Cart not found!" });
        }
        const FindIndex = FindUser.Products.findIndex(
            (p) => p.product_id.toString() === productid.toString()
        )
        if (FindIndex !== -1) {
            FindUser.Products[FindIndex].quantity += 1
            await FindUser.save()
            return res.status(200).json({ message: "Increase Quantity" });
        } else {
            return res.status(404).json({ message: "Product not found in cart!" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const DecreaseQuantity = async (req, res) => {
    try {
        const user = req.user._id
        const productid = req.params.productid

        const FindUser = await CartModel.findOne({ user_id: user })

        if (!FindUser) {
            return res.status(404).json({ message: "Cart not found!" });
        }
        const FindIndex = FindUser.Products.findIndex(
            (p) => p.product_id.toString() === productid.toString()
        )

        if (FindIndex !== -1) {
            if (FindUser.Products[FindIndex].quantity > 1) {
                FindUser.Products[FindIndex].quantity -= 1
                await FindUser.save()
                return res.status(200).json({ message: "Decrease Quantity" });
            } else {
                return res.status(400).json({ message: "Quantity can't go below 1" });
            }
        } else {
            return res.status(404).json({ message: "Product not found in cart!" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const GetCart = async (req, res) => {
    try {
        const user = req.user._id
        const FindUser = await CartModel
            .findOne({ user_id: user })
            .populate('Products.product_id', 'name images price offer_price seller_id')

        if (!FindUser) {
            return res.status(200).json({ message: "User Not Found", FindUser });
        } else {
            return res.status(200).json({ message: "User Cart Fetched Successfully!", FindUser });
        }

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

export {
    AddToCart,
    RemoveToCart,
    IncreaseQuantity,
    DecreaseQuantity,
    GetCart
}
import { CartModel } from "../model/Cart.model.js"
import { OrderModel } from "../model/Order.Model.js"

const AddOrder = async (req, res) => {
    try {
        const { iscart, address_id, products } = req.body
        const user = req.user._id

        if (products.length > 1) {
            const order = products.map((item) => ({
                user_id: user,
                address: address_id,
                total_price: item.quantity * item.product_id.offer_price,
                products: {
                    product_id: item.product_id?._id,
                    quantity: item.quantity,
                    price: item.product_id?.offer_price
                },
                paymentStatus: 'Paid',
                seller_id: item.product_id.seller_id
            }));

            await OrderModel.insertMany(order)
        } else {
            const total_price = (products[0].offer_price || products[0]?.product_id?.offer_price) * 1;

            const NewOrder = new OrderModel({
                user_id: user,
                address: address_id,
                total_price: total_price,
                products: {
                    product_id: products[0].product_id?._id || products[0]._id,
                    quantity: products.quantity || 1,
                    price: products[0].offer_price || products[0]?.product_id?.offer_price
                },
                paymentStatus: 'Paid',
                seller_id: products[0].seller_id || products[0].product_id.seller_id
            })
            await NewOrder.save()
        }

        if (iscart) {
            await CartModel.findOneAndDelete({ user_id: user })
        }

        return res.status(200).json({ message: 'Order placed successfully' });

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const GetUserOrders = async (req, res) => {
    try {
        const user = req.user._id

        const FindOrders = await OrderModel.find({ user_id: user })
            .select('-address -paymentStatus -_id -updatedAt -products.price -products.user_id -user_id')
            .populate('products.product_id', 'images name')
            .sort({ createdAt: -1 })

        return res.status(200).json({ message: 'Order fetch successfully', FindOrders });

    } catch (error) {
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

const GetSellerOrder = async (req, res) => {
    try {
        const seller_id = req.user._id;

        const FindOrder = await OrderModel.find({ seller_id: seller_id })
            .sort({ createdAt: -1 })
        if (!FindOrder || FindOrder.length === 0) {
            return res.status(400).json({ message: 'Not Order Yet' })
        }

        return res.status(200).json({ message: "Seller orders fetched successfully", FindOrder });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, try again!" });
    }
};

const ChangeStatus = async (req, res) => {
    try {
        const { status } = req.body
        const user = req.user._id
        let order_id = req.params.order_id

        order_id = order_id.replace(/^:/, '')

        const FindOrder = await OrderModel.findById(order_id)
        if (!FindOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (FindOrder.seller_id.toString() !== user.toString()) {
            return res.status(403).json({ message: "Unauthorized to change order status" });
        }

        FindOrder.orderStatus = status
        await FindOrder.save()

        return res.status(200).json({ message: "Status Changed successfully", FindOrder });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong, try again!" });
    }
}

export {
    AddOrder,
    GetUserOrders,
    GetSellerOrder,
    ChangeStatus
}
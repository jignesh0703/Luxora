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
                paymentStatus: 'Paid'
            }));

            await OrderModel.insertMany(order)
        } else {
            const total_price = products[0].offer_price * 1;

            const NewOrder = new OrderModel({
                user_id: user,
                address: address_id,
                total_price: total_price,
                products: {
                    product_id: products[0]._id,
                    quantity: 1,
                    price: products[0].offer_price
                },
                paymentStatus: 'Paid'
            })
            await NewOrder.save()
        }

        if (iscart) {
            await CartModel.findOneAndDelete({ user_id: user })
        }

        return res.status(200).json({ message: 'Order placed successfully' });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Somthing wrong try again!" })
    }
}

export {
    AddOrder
}
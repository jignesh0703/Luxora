import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import Productrouter from './routes/Product.routes.js'
import SellerRoutes from './routes/Seller.routes.js'
import UserRoutes from './routes/User.routes.js';
import OTPRoutes from './routes/otp.routes.js';
import WishlistRoutes from './routes/Wishlist.routes.js';
import CartRoutes from './routes/Cart.routes.js';
import AddressRoutes from './routes/Address.routes.js';
import OrderRoutes from './routes/Order.routes.js';
import RateRoutes from './routes/Rate.routes.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173", "https://luxora-1.onrender.com"],
  credentials: true
}));

app.use('/api/user', UserRoutes)
app.use('/api/product', Productrouter)
app.use('/api/seller', SellerRoutes)
app.use('/api/otp', OTPRoutes)
app.use('/api/wishlist', WishlistRoutes)
app.use('/api/cart', CartRoutes)
app.use('/api/address', AddressRoutes)
app.use('/api/order', OrderRoutes)
app.use('/api/rate', RateRoutes)

export default app
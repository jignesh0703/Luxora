import express from 'express'
import cookieParser from 'cookie-parser';
import Productrouter from './routes/Product.routes.js'
import SellerRoutes from './routes/Seller.routes.js'
import UserRoutes from './routes/User.routes.js';
import OTPRoutes from './routes/otp.routes.js';
import cors from 'cors'
import WishlistRoutes from './routes/Wishlist.routes.js';
import CartRoutes from './routes/Cart.routes.js';
import AddressRoutes from './routes/Address.routes.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: 'https://luxora-puce.vercel.app',
  credentials: true
}));


app.use('/api/user', UserRoutes)
app.use('/api/product', Productrouter)
app.use('/api/seller', SellerRoutes)
app.use('/api/otp', OTPRoutes)
app.use('/api/wishlist', WishlistRoutes)
app.use('/api/cart', CartRoutes)
app.use('/api/address', AddressRoutes)

export default app
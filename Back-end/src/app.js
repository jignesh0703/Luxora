import express from 'express'
import cookieParser from 'cookie-parser';
import Productrouter from './routes/Product.routes.js'
import SellerRoutes from './routes/Seller.routes.js'
import UserRoutes from './routes/User.routes.js';
import OTPRoutes from './routes/otp.routes.js';
import { OTPModel } from './model/Otp.model.js';
import cors from 'cors'

const app = express()

async function setupIndexes() {
  try {
    await OTPModel.createIndexes({ createdAt: 1 }, { expireAfterSeconds: 600 });
    console.log("TTL index applied for OTPs ✅");
  } catch (err) {
    console.error("Error creating TTL index:", err);
  }
}
setupIndexes()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/api/user', UserRoutes)
app.use('/api/product', Productrouter)
app.use('/api/seller', SellerRoutes)
app.use('/api/otp', OTPRoutes)

export default app
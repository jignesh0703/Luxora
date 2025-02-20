import express from 'express'
import JWTVerify from '../middleware/JWT.middelware.user.js'
import { AddToCart, DecreaseQuantity, GetCart, IncreaseQuantity, RemoveToCart } from '../controller/Cart.controller.js'

const CartRoutes = express.Router()

CartRoutes.get('/get',JWTVerify,GetCart)
CartRoutes.post('/add/:productid', JWTVerify, AddToCart)
CartRoutes.delete('/remove/:productid', JWTVerify, RemoveToCart)
CartRoutes.post('/increase/:productid', JWTVerify, IncreaseQuantity)
CartRoutes.post('/decrease/:productid', JWTVerify, DecreaseQuantity)

export default CartRoutes
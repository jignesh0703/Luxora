import express from 'express'
import { AddOrder, ChangeStatus, GetSellerOrder, GetUserOrders } from '../controller/Order.Controller.js'
import JWTVerify from '../middleware/JWT.middelware.user.js'

const OrderRoutes = express.Router()

OrderRoutes.post('/add', JWTVerify, AddOrder)
OrderRoutes.get('/getuser',JWTVerify,GetUserOrders)
OrderRoutes.get('/getseller',JWTVerify,GetSellerOrder)
OrderRoutes.post('/changestatus/:order_id',JWTVerify,ChangeStatus)

export default OrderRoutes
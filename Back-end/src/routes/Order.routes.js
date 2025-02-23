import express from 'express'
import { AddOrder } from '../controller/Order.Controller.js'
import JWTVerify from '../middleware/JWT.middelware.user.js'

const OrderRoutes = express.Router()

OrderRoutes.post('/add', JWTVerify, AddOrder)

export default OrderRoutes
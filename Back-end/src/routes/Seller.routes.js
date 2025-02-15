import express from 'express'
import { RegistorSeller } from '../controller/Sellet.controller.js'
import JWTVerify from '../middleware/JWT.middelware.user.js'

const SellerRoutes = express.Router()

SellerRoutes.post('/registor', JWTVerify, RegistorSeller)

export default SellerRoutes
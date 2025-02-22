import express from 'express'
import { RegistorSeller, Updatedata } from '../controller/Sellet.controller.js'
import JWTVerify from '../middleware/JWT.middelware.user.js'

const SellerRoutes = express.Router()

SellerRoutes.post('/registor', JWTVerify, RegistorSeller)
SellerRoutes.post('/updatedata', JWTVerify, Updatedata)

export default SellerRoutes
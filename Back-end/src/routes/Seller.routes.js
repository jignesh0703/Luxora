import express from 'express'
import { Login, RegistorSeller } from '../controller/Sellet.controller.js'

const SellerRoutes = express.Router()

SellerRoutes.post('/registor',RegistorSeller)
SellerRoutes.post('/login',Login)

export default SellerRoutes
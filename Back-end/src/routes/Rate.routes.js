import express from 'express'
import { AddRating, GetProductAllRating, GetUserAllReviews } from '../controller/Rate.controller.js'
import JWTVerify from '../middleware/JWT.middelware.user.js'

const RateRoutes = express.Router()

RateRoutes.post('/add/:product_id', JWTVerify, AddRating)
RateRoutes.get('/getproduct/:product_id', GetProductAllRating)
RateRoutes.get('/getuser', JWTVerify, GetUserAllReviews)

export default RateRoutes
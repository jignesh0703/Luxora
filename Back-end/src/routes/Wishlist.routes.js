import express from 'express'
import { CheckAlready, FetchAll, RemoveWishList, ToggleWishList } from '../controller/Wishlist.controller.js'
import JWTVerify from '../middleware/JWT.middelware.user.js'

const WishlistRoutes = express.Router()

WishlistRoutes.post('/toggle/:productid', JWTVerify, ToggleWishList)
WishlistRoutes.get('/check/:productid', JWTVerify, CheckAlready)
WishlistRoutes.get('/fetch', JWTVerify, FetchAll)
WishlistRoutes.delete('/remove/:productid', JWTVerify, RemoveWishList)

export default WishlistRoutes
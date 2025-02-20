import express from 'express'
import { AddProduct, DeleteProduct, GetAllProduct, GetIndivisualProduct, GetSellerAllProduct, UpdateProduct } from '../controller/Product.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import JWTVerify from '../middleware/JWT.middelware.user.js'

const Productrouter = express.Router()

Productrouter.post('/add', upload.fields([
    { name: 'images' }
]), JWTVerify, AddProduct)
Productrouter.delete('/delete/:product_id', JWTVerify, DeleteProduct)
Productrouter.post('/update/:product_id', JWTVerify, UpdateProduct)
Productrouter.get('/getallproduct', GetAllProduct)
Productrouter.get('/getsellerproduct', JWTVerify, GetSellerAllProduct)
Productrouter.get('/getindivisualproduct/:product_id', GetIndivisualProduct)

export default Productrouter
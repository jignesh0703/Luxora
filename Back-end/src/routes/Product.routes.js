import express from 'express'
import { AddProduct , DeleteProduct, GetAllProduct, GetIndivisualProduct } from '../controller/Product.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import JWTVerify from '../middleware/JWT.middelware.js'

const Productrouter = express.Router()

Productrouter.post('/add', upload.fields([
    { name: 'image' },
    { name: 'video' }
]),JWTVerify, AddProduct)
Productrouter.delete('/delete/:product_id',JWTVerify,DeleteProduct)
Productrouter.get('/getallproduct',GetAllProduct)
Productrouter.get('/getindivisualproduct/:product_id',GetIndivisualProduct)

export default Productrouter
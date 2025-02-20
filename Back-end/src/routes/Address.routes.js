import express from 'express'
import JWTVerify from '../middleware/JWT.middelware.user.js'
import { AddAdress, FetchAddress, RemoveAddress } from '../controller/Address.Controller.js'

const AddressRoutes = express.Router()

AddressRoutes.post('/add',JWTVerify,AddAdress)
AddressRoutes.get('/fetch',JWTVerify,FetchAddress)
AddressRoutes.delete('/remove/:address_id',JWTVerify,RemoveAddress)

export default AddressRoutes
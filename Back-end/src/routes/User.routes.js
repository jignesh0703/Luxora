import express from 'express'
import { GetUserData, Login, Registration } from '../controller/User.controller.js'
import JWTVerify from '../middleware/JWT.middelware.user.js'

const UserRoutes = express.Router()

UserRoutes.post('/registration', Registration)
UserRoutes.post('/login', Login)
UserRoutes.get('/getdata',JWTVerify, GetUserData)

export default UserRoutes
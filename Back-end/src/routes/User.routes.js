import express from 'express'
import { GetUserData, Login, logout, Registration } from '../controller/User.controller.js'
import JWTVerify from '../middleware/JWT.middelware.user.js'

const UserRoutes = express.Router()

UserRoutes.post('/registration', Registration)
UserRoutes.post('/login', Login)
UserRoutes.get('/getdata',JWTVerify, GetUserData)
UserRoutes.post('/logout',JWTVerify, logout)

export default UserRoutes
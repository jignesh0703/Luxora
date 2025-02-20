import express from 'express'
import { GetUserData, Login, logout, Registration, UpdateEmail, UpdateNumber, UpdateUsername } from '../controller/User.controller.js'
import JWTVerify from '../middleware/JWT.middelware.user.js'

const UserRoutes = express.Router()

UserRoutes.post('/registration', Registration)
UserRoutes.post('/login', Login)
UserRoutes.get('/getdata',JWTVerify, GetUserData)
UserRoutes.post('/logout',JWTVerify, logout)
UserRoutes.post('/updateusername',JWTVerify, UpdateUsername)
UserRoutes.post('/updatenumber',JWTVerify, UpdateNumber)
UserRoutes.post('/updateemail',JWTVerify, UpdateEmail)

export default UserRoutes
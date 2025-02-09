import express from 'express'
import { Login, Registration } from '../controller/User.controller.js'

const UserRoutes = express.Router()

UserRoutes.post('/registration',Registration)
UserRoutes.post('/login',Login)

export default UserRoutes
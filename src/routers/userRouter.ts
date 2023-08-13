import express from 'express'
import * as UserController from '../controllers/userController'
import asyncHandler from '../util/asynchandle'
const userRouter = express.Router()

userRouter.post('/create', asyncHandler(UserController.createUser))
userRouter.post('/update', asyncHandler(UserController.updateUser))
userRouter.post('/findById', asyncHandler(UserController.findUser))

export default userRouter
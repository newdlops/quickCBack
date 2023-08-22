import express from 'express'
import * as UserController from '../controllers/userController'
import asyncHandler from '../util/asynchandle'
const userRouter = express.Router()

userRouter.post('/create', asyncHandler(UserController.createUser))
userRouter.post('/update', asyncHandler(UserController.updateUser))
userRouter.post('/findById', asyncHandler(UserController.findUser))
userRouter.put('/update', asyncHandler(UserController.updateUser))

userRouter.post('/user', asyncHandler(UserController.createUser))
userRouter.get('/user/:id', asyncHandler(UserController.findUserById))
userRouter.get('/users', asyncHandler(UserController.users))
userRouter.delete('/user/:id', asyncHandler(UserController.deleteUser))
userRouter.post('/delete', asyncHandler(UserController.deleteUsers))
userRouter.put('/user/:id', asyncHandler(UserController.updateUser))

export default userRouter
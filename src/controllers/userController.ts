import { Request, Response } from 'express'
import { IUserModel } from '../models/userModel'
import * as userService from '../services/userService'

interface CustomRequest<T> extends Request {
  body: T
}

export const createUser = async (req : CustomRequest<IUserModel>, res : Response) => {
  const newUser : IUserModel = req.body
  const result = await userService.createUser(newUser)
  res.json({status:200, msg:result})
}

export const updateUser = async (req : CustomRequest<IUserModel>, res : Response) => {
  const newUser : IUserModel = req.body
  const result = await userService.updateUser(newUser)
  res.json({status:200, msg:result})
}

export const findUser = async (req : CustomRequest<IUserModel>, res : Response) => {
  const targetUser : IUserModel = req.body
  const result = await userService.findUser(targetUser)
  res.json({status:200, msg:result})
}
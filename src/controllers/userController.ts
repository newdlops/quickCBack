import { Request, Response } from 'express'
import { IUserModel } from '../models/userModel'
import * as userService from '../services/userService'
import { SortOrder } from 'mongoose'

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

export const findUserById = async (req : Request, res : Response) => {
  const userId = req.params.id
  const result = await userService.findUserById(userId)
  res.json({status:200, msg:result})
}

export const users = async (req : Request, res : Response) => {
  const page = parseInt(req.query.page as string) ?? 1
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) ?? 10
  const sortField = req.query.sortField as string
  const sortOrder = parseInt(req.query.sortOrder as string)
  const globalFilter = req.query.globalFilter as string
  const result = await userService.getUsers(page, itemsPerPage, sortField, sortOrder as SortOrder, globalFilter)
  res.json({status:200, msg:result})
}

export const deleteUser = async (req : Request, res : Response) => {
  const userId = req.params.id
  const result = await userService.deleteUser(userId)
  res.json({status:200, msg:result})
}

export const deleteUsers = async (req : CustomRequest<string[]>, res : Response) => {
  const userIds = req.body
  const result = await userService.deleteUsers(userIds)
  res.json({status:200, msg: result})
}

export const userKakaoLogin = async (req : Request, res : Response) => {
  const kakaoLoginInfo = await userService.userKakaoLogin(req.params.token)
  res.json({status:200, msg: kakaoLoginInfo})
}

export const userTokenLogin = async (req : Request, res : Response) => {
  const user = await userService.userTokenLogin(req.params.token)
  res.json({status:200, msg: user})
}

export const userLogin = async (req : Request, res : Response) => {
  const userLoginInfo = req.body as UserLoginInfo
  const user = await userService.userLogin(userLoginInfo)
  res.json({status:200, msg: user})
}

export const adminLogin = async (req : Request, res : Response) => {
  const userLoginInfo = req.body as UserLoginInfo
  console.log(userLoginInfo)
  const user = await userService.adminLogin(userLoginInfo)
  res.json({status:200, msg: user})
}

export const userLogout = async (req : Request, res : Response) => {
  const user = await userService.userLogout(req.params.token)
  res.json({status:200, msg: user})
}

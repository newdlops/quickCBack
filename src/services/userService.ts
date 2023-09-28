import UserModel, { IUserModel } from '../models/userModel'
import { logger } from '../../config/logger'
import { SortOrder } from 'mongoose'
import {ObjectId} from "mongodb"

export async function createUser(user: IUserModel) {
  try {
    const newUser = new UserModel(user)
    return await newUser.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateUser(user: IUserModel) {
  try {
    const updatedUser = await UserModel.findById(user._id)
    Object.keys(user).forEach(key => {
      updatedUser[key] = user[key] as IUserModel
    })
    return await updatedUser.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function deleteUser(id: string) {
  try {
    const user = await UserModel.findById(id)
    user.isDelete = true
    user.deletedAt = new Date()
    await user.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findUser(user: IUserModel) {
  try {
    return await UserModel.findById(user.id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findUserById(id: string) {
  try {
    return await UserModel.findById(id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getUsers(page: number, itemsPerPage: number, sortField: string, sortOrder: SortOrder, globalFilter: string) {
  const startIndex = (page) * itemsPerPage
  try {
    const sortcriteria = sortField ? { [sortField]: sortOrder} : null
    const filters = globalFilter ? { $or: [{ username: { $regex: globalFilter } }, { email: { $regex: globalFilter}}, (globalFilter.length == 24 ? { _id: { $eq: new ObjectId(globalFilter) } }: { none: "" })]} : null
    const result = await UserModel.find(filters).skip(startIndex).limit(itemsPerPage).sort(sortcriteria)
    const totalNumber = await UserModel.countDocuments()
    return { users: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function deleteUsers(ids: string[]) {
  try {
    return await UserModel.updateMany({_id: { $in: ids}}, { $set: {isDelete: true}})
  } catch (err) {
    logger.error('Error', err)
  }
}

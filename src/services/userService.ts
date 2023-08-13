import UserModel, { IUserModel } from '../models/userModel'
import { logger } from '../../config/logger'

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
    const updatedUser = await UserModel.findById(user.id)
    Object.keys(user).forEach(key => {
      updatedUser[key] = user[key] as IUserModel
    })
    return await updatedUser.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function deleteUser(user: IUserModel) {
  try {
    const newUser = new UserModel(user)
    await newUser.updateOne()
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
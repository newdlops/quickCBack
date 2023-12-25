import { logger } from '../../config/logger'
import WrongInformationModel, { IWrongInformationModel } from '../models/wornginformation'
import { SortOrder } from 'mongoose'
import { ObjectId } from 'mongodb'
import * as userService from './userService'

export async function createWrongInformation(wrongInformation: IWrongInformationModel) {
  try {
    const input = {
      title: wrongInformation.title,
      content: wrongInformation.content,
      requestUser: wrongInformation.requestUser,
      productName: wrongInformation.productName,
      product: wrongInformation.product,
    }

    const newWrongInformation = new WrongInformationModel(input)
    return await newWrongInformation.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateWrongInformation(wrongInformation: IWrongInformationModel) {
  try {
    const updatedWrongInformation = await WrongInformationModel.findById(wrongInformation._id)
    Object.keys(wrongInformation).forEach(key => {
      updatedWrongInformation[key] = wrongInformation[key] as IWrongInformationModel
    })
    return await updatedWrongInformation.save()
  } catch (err) {
    logger.error('updateWrongInformation Error', err)
  }
}

export async function getWrongInformationByUser(userId: string) {
  try {
    const user = await userService.findUserById(userId)
    return await WrongInformationModel.find({ requestUser: user})
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getWrongInformations() {
  try {
    return await WrongInformationModel.find()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getWrongInformationList(
  page: number,
  itemsPerPage: number,
  sortField: string,
  sortOrder: SortOrder,
  globalFilter: string,
) {
  const startIndex = page * itemsPerPage
  try {
    const sortCriteria = sortField ? { [sortField]: sortOrder } : null
    const filters = globalFilter
      ? {
        $or: [
          { name: { $regex: globalFilter } },
          { content: { $regex: globalFilter } },
          globalFilter.length == 24
            ? { _id: { $eq: new ObjectId(globalFilter) } }
            : { none: '' },
        ],
      }
      : null
    const result = await WrongInformationModel.find(filters)
      .skip(startIndex)
      .limit(itemsPerPage)
      .sort(sortCriteria)
    const totalNumber = await WrongInformationModel.countDocuments()
    return { wrongInformations: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

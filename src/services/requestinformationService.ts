import { logger } from '../../config/logger'
import RequestInformationModel, { IRequestInformationModel } from '../models/requestinformation'
import { SortOrder } from 'mongoose'
import { ObjectId } from 'mongodb'
import { IUserModel } from '../models/userModel'
import * as userService from './userService'

export async function createRequestInformation(requestInformation: IRequestInformationModel) {
  try {
    const input = {
      title: requestInformation.title,
      content: requestInformation.content,
      productName: requestInformation.productName,
      requestUser: requestInformation.requestUser,
    }

    const newRequestInformation = new RequestInformationModel(input)
    return await newRequestInformation.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateRequestInformation(requestInformation: IRequestInformationModel) {
  try {
    const updatedRequestInformation = await RequestInformationModel.findById(requestInformation._id)
    Object.keys(requestInformation).forEach(key => {
      updatedRequestInformation[key] = requestInformation[key] as IRequestInformationModel
    })
    return await updatedRequestInformation.save()
  } catch (err) {
    logger.error('updateRequestInformation Error', err)
  }
}

export async function getRequestInformationDetail(id: string) {
  try {
    return await RequestInformationModel.findById(id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getRequestInformations() {
  try {
    return await RequestInformationModel.find()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getRequestInformationByUser(userId: string) {
  try {
    const user = await userService.findUserById(userId)
    return await RequestInformationModel.find({ requestUser: user})
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getRequestInformationList(
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
    const result = await RequestInformationModel.find(filters)
      .skip(startIndex)
      .limit(itemsPerPage)
      .sort(sortCriteria)
    const totalNumber = await RequestInformationModel.countDocuments()
    return { requestInformations: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

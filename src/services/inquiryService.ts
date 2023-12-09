import { logger } from '../../config/logger'
import InquiryModel, { IInquiryModel } from '../models/inquiryModel'
import ProjectModel, { IProjectModel } from '../models/projectModel'
import UserModel, { IUserModel } from '../models/userModel'
import * as userService from './userService'
import { SortOrder } from 'mongoose'
import { ObjectId } from 'mongodb'

type InqueryRequest = IInquiryModel & IProjectModel
export async function createInquiry(inquery: InqueryRequest) {
  try {
    console.log('inqueir  ', inquery)
    const input = {
      projectname: `${inquery.user?.username}-${inquery.productName}`,
      requestUser: inquery.user,
      modelName: inquery.productName,
      manufacture: inquery.manufactureName,
      // projectNumber: projectNumber,
      projectStatus: false,
      // projectItems: projectItems,

      name: inquery.name,
      productName: inquery.productName,
      content: inquery.content,
      user: inquery.requestUser,
      reply: inquery.reply,
      contact: inquery.contact,
    }

    const newProject = new ProjectModel(input)
    return await newProject.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateInquiry(inquiry: IInquiryModel) {
  try {
    const updatedInquiry = await InquiryModel.findById(inquiry._id)
    Object.keys(inquiry).forEach(key => {
      updatedInquiry[key] = inquiry[key] as IInquiryModel
    })
    return await updatedInquiry.save()
  } catch (err) {
    logger.error('updateInquiry Error', err)
  }
}

export async function findInquiriesByUser(userId: string) {
  try {
    const inquiryUser = await userService.findUserById(userId)
    return await InquiryModel.find({ user: inquiryUser }, null, { sort: '-_id' }).lean()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getInquiryDetail(id: string) {
  try {
    return await InquiryModel.findById(id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getInquiries(
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
    const result = await InquiryModel.find(filters)
      .skip(startIndex)
      .limit(itemsPerPage)
      .sort(sortCriteria)
    const totalNumber = await InquiryModel.countDocuments()
    return { inquiries: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

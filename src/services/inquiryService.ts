import { logger } from '../../config/logger'
import InquiryModel, { IInquiryModel } from '../models/inquiryModel'
import ProjectModel, { IProjectModel } from '../models/projectModel'
import * as userService from './userService'
import { SortOrder } from 'mongoose'
import { ObjectId } from 'mongodb'
import { s3 } from '../../config/s3'
import fs from 'fs'


type InqueryRequest = IInquiryModel & IProjectModel

export async function createInquiry(inquery: any, files: any[]) {
  try {
    let uploadCount = 0
    const photos = []
    try {
      if(files.length>0) {
        files.forEach((file: any) => {
          const s3Params = {
            Bucket: 'quickmedia',
            Key: `document/${file.filename}`,
            Body: fs.createReadStream(file.path),
            ContentType: file.mimetype,
            ACL: 'public-read',
          }
          s3.upload(s3Params, async function (err, data) {
            console.log(data)
            if (err) {
              console.log('error s3', err)
            }
            fs.unlink(file.path, function (err) {
              if (err) {
                console.log('Failed to delete local file', err)
              }
            })
            photos.push(data.Location)
            uploadCount++
            if (uploadCount === files.length) {
              console.log('upload done')
              console.log('인쿼리 생성')
              console.log(inquery)
              console.log(photos)
              const input = {
                projectname: inquery.productName,
                requestUser: inquery.user,
                modelName: inquery.productName,
                manufacture: inquery.manufactureName,
                projectStatus: false,

                name: inquery.name,
                productName: inquery.productName,
                content: inquery.content,
                user: inquery.requestUser,
                reply: inquery.reply,
                contact: inquery.contact,
                photos: photos,
              }

              const newProject = new ProjectModel(input)
              return await newProject.save()
            }
          })
        })
      } else {
        const input = {
          projectname: inquery.productName,
          requestUser: inquery.user,
          modelName: inquery.productName,
          manufacture: inquery.manufactureName,
          projectStatus: false,

          name: inquery.name,
          productName: inquery.productName,
          content: inquery.content,
          user: inquery.requestUser,
          reply: inquery.reply,
          contact: inquery.contact,
          photos: [],
        }

        const newProject = new ProjectModel(input)
        return await newProject.save()
      }
    } catch (e) {
      console.log('error during s3')
      console.log(e)
    }
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
    return await InquiryModel.find({ user: inquiryUser }, null, {
      sort: '-_id',
    }).lean()
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

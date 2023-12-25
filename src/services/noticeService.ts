import { logger } from '../../config/logger'
import NoticeModel, { INoticeModel } from '../models/noticeModel'
import { SortOrder } from 'mongoose'
import { ObjectId } from 'mongodb'

export async function createNotice(notice: INoticeModel) {
  try {
    const input = {
      title: notice.title,
      content: notice.content,
    }

    const newNotice = new NoticeModel(input)
    return await newNotice.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateNotice(notice: INoticeModel) {
  try {
    const updatedNotice = await NoticeModel.findById(notice._id)
    Object.keys(notice).forEach(key => {
      updatedNotice[key] = notice[key] as INoticeModel
    })
    return await updatedNotice.save()
  } catch (err) {
    logger.error('updateNotice Error', err)
  }
}

export async function getNoticeDetail(id: string) {
  try {
    return await NoticeModel.findById(id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getNotices() {
  try {
    return await NoticeModel.find()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getRecentNotice() {
  try {
    return await NoticeModel.findOne().sort({ createdAt: -1 }).limit(1)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getNoticeList(
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
    const result = await NoticeModel.find(filters)
      .skip(startIndex)
      .limit(itemsPerPage)
      .sort(sortCriteria)
    const totalNumber = await NoticeModel.countDocuments()
    return { notices: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

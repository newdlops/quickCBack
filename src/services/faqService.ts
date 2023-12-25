import { logger } from '../../config/logger'
import FaqModel, { IFaqModel } from '../models/faqModel'
import { SortOrder } from 'mongoose'
import { ObjectId } from 'mongodb'

export async function createFaq(faq: IFaqModel) {
  try {
    const input = {
      question: faq.question,
      answer: faq.answer,
    }

    const newFaq = new FaqModel(input)
    return await newFaq.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateFaq(faq: IFaqModel) {
  try {
    const updatedFaq = await FaqModel.findById(faq._id)
    Object.keys(faq).forEach(key => {
      updatedFaq[key] = faq[key] as IFaqModel
    })
    return await updatedFaq.save()
  } catch (err) {
    logger.error('updateFaq Error', err)
  }
}

export async function getFaqDetail(id: string) {
  try {
    return await FaqModel.findById(id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getFaqs() {
  try {
    return await FaqModel.find()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getFaqList(
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
    const result = await FaqModel.find(filters)
      .skip(startIndex)
      .limit(itemsPerPage)
      .sort(sortCriteria)
    const totalNumber = await FaqModel.countDocuments()
    return { faqs: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

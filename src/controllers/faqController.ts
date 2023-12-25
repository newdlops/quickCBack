import { Request, Response } from 'express'
import * as faqService from '../services/faqService'
import { IFaqModel } from '../models/faqModel'
import { SortOrder } from 'mongoose'
import { logger } from '../../config/logger'

interface CustomRequest<T> extends Request {
  body: T
}

export const createFaq = async (
  req: CustomRequest<IFaqModel>,
  res: Response,
) => {
  const newFaq: IFaqModel = req.body
  const result = await faqService.createFaq(newFaq)
  res.json({ status: 200, msg: result })
}

export const getFaqDetail = async (req: Request, res: Response) => {
  const id: string = req.params.id
  const result = await faqService.getFaqDetail(id)
  res.json({ status: 200, msg: result })
}

export async function getFaqs(req: Request, res: Response){
  try {
    const result = await faqService.getFaqs()
    res.json({
      status: 200,
      msg: result,
    })
  }
  catch (err) {
    logger.error('Error', err)
  }
}

export const updateFaq = async (
  req: CustomRequest<IFaqModel>,
  res: Response,
) => {
  const inquiry: IFaqModel = req.body
  const result = await faqService.updateFaq(inquiry)
  res.json({ status: 200, msg: result })
}

export const getFaqList = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) ?? 1
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) ?? 10
  const sortField = req.query.sortField as string
  const sortOrder = parseInt(req.query.sortOrder as string)
  const globalFilter = req.query.globalFilter as string
  const result = await faqService.getFaqList(
    page,
    itemsPerPage,
    sortField,
    sortOrder as SortOrder,
    globalFilter,
  )
  res.json({ status: 200, msg: result })
}

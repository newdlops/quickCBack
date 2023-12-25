import { Request, Response } from 'express'
import * as noticeService from '../services/noticeService'
import { INoticeModel } from '../models/noticeModel'
import { SortOrder } from 'mongoose'
import { logger } from '../../config/logger'

interface CustomRequest<T> extends Request {
  body: T
}

export const createNotice = async (
  req: CustomRequest<INoticeModel>,
  res: Response,
) => {
  const newNotice: INoticeModel = req.body
  const result = await noticeService.createNotice(newNotice)
  res.json({ status: 200, msg: result })
}

export const getNoticeDetail = async (req: Request, res: Response) => {
  const id: string = req.params.id
  const result = await noticeService.getNoticeDetail(id)
  res.json({ status: 200, msg: result })
}

export async function getNotices(req: Request, res: Response){
  try {
    const result = await noticeService.getNotices()
    res.json({
      status: 200,
      msg: result,
    })
  }
  catch (err) {
    logger.error('Error', err)
  }
}

export const updateNotice = async (
  req: CustomRequest<INoticeModel>,
  res: Response,
) => {
  const notice: INoticeModel = req.body
  const result = await noticeService.updateNotice(notice)
  res.json({ status: 200, msg: result })
}

export const getRecentNotice = async (
  req: CustomRequest<INoticeModel>,
  res: Response,
) => {
  const result = await noticeService.getRecentNotice()
  res.json({ status: 200, msg: result })
}

export const getNoticeList = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) ?? 1
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) ?? 10
  const sortField = req.query.sortField as string
  const sortOrder = parseInt(req.query.sortOrder as string)
  const globalFilter = req.query.globalFilter as string
  const result = await noticeService.getNoticeList(
    page,
    itemsPerPage,
    sortField,
    sortOrder as SortOrder,
    globalFilter,
  )
  res.json({ status: 200, msg: result })
}

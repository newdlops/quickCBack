import { Request, Response } from 'express'
import * as inquiryService from '../services/inquiryService'
import { IInquiryModel } from '../models/inquiryModel'
import { IUserModel } from '../models/userModel'
import { SortOrder } from 'mongoose'
import { s3 } from '../../config/s3'
import fs from 'fs'



interface CustomRequest<T> extends Request {
  body: T
}

export const createInquiry = async (
  req: any,
  res: Response,
) => {
  const newInquiry: any = req.body
  const result = await inquiryService.createInquiry(newInquiry, req.files)
  res.json({ status: 200, msg: result })
}

export const findInquiryByUser = async (
  req: CustomRequest<IUserModel>,
  res: Response,
) => {
  const user: string = req.params.id
  const result = await inquiryService.findInquiriesByUser(user)
  res.json({ status: 200, msg: result })
}

export const getInquiryDetail = async (req: Request, res: Response) => {
  const id: string = req.params.id
  const result = await inquiryService.getInquiryDetail(id)
  res.json({ status: 200, msg: result })
}

export const updateInquiry = async (
  req: CustomRequest<IInquiryModel>,
  res: Response,
) => {
  const inquiry: IInquiryModel = req.body
  const result = await inquiryService.updateInquiry(inquiry)
  res.json({ status: 200, msg: result })
}

export const inquiries = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) ?? 1
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) ?? 10
  const sortField = req.query.sortField as string
  const sortOrder = parseInt(req.query.sortOrder as string)
  const globalFilter = req.query.globalFilter as string
  const result = await inquiryService.getInquiries(
    page,
    itemsPerPage,
    sortField,
    sortOrder as SortOrder,
    globalFilter,
  )
  res.json({ status: 200, msg: result })
}

import { Request, Response } from 'express'
import * as wrongInformationService from '../services/wrongInformationService'
import { IWrongInformationModel } from '../models/wornginformation'
import { SortOrder } from 'mongoose'
import { logger } from '../../config/logger'

interface CustomRequest<T> extends Request {
  body: T
}

export const createWrongInformation = async (
  req: CustomRequest<IWrongInformationModel>,
  res: Response,
) => {
  const newWrongInformation: IWrongInformationModel = req.body
  const result = await wrongInformationService.createWrongInformation(newWrongInformation)
  res.json({ status: 200, msg: result })
}

export const getWrongInformationByUser = async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  const result = await wrongInformationService.getWrongInformationByUser(userId)
  res.json({ status: 200, msg: result })
}

export async function getWrongInformations(req: Request, res: Response){
  try {
    const result = await wrongInformationService.getWrongInformations()
    res.json({
      status: 200,
      msg: result,
    })
  }
  catch (err) {
    logger.error('Error', err)
  }
}

export const updateWrongInformation = async (
  req: CustomRequest<IWrongInformationModel>,
  res: Response,
) => {
  const inquiry: IWrongInformationModel = req.body
  const result = await wrongInformationService.updateWrongInformation(inquiry)
  res.json({ status: 200, msg: result })
}

export const getWrongInformationList = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) ?? 1
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) ?? 10
  const sortField = req.query.sortField as string
  const sortOrder = parseInt(req.query.sortOrder as string)
  const globalFilter = req.query.globalFilter as string
  const result = await wrongInformationService.getWrongInformationList(
    page,
    itemsPerPage,
    sortField,
    sortOrder as SortOrder,
    globalFilter,
  )
  res.json({ status: 200, msg: result })
}

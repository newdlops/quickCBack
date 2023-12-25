import { Request, Response } from 'express'
import * as requestInformationService from '../services/requestinformationService'
import { IRequestInformationModel } from '../models/requestinformation'
import { SortOrder } from 'mongoose'
import { logger } from '../../config/logger'
import * as projectService from '../services/projectService'

interface CustomRequest<T> extends Request {
  body: T
}

export const createRequestInformation = async (
  req: CustomRequest<IRequestInformationModel>,
  res: Response,
) => {
  const newRequestInformation: IRequestInformationModel = req.body
  const result = await requestInformationService.createRequestInformation(
    newRequestInformation,
  )
  res.json({ status: 200, msg: result })
}

export const getRequestInformationDetail = async (req: Request, res: Response) => {
  const id: string = req.params.id
  const result = await requestInformationService.getRequestInformationDetail(id)
  res.json({ status: 200, msg: result })
}

export async function getRequestInformations(req: Request, res: Response){
  try {
    const result = await requestInformationService.getRequestInformations()
    res.json({
      status: 200,
      msg: result,
    })
  }
  catch (err) {
    logger.error('Error', err)
  }
}

export const getRequestInformationByUser = async (req : Request, res : Response) => {
  const userId = req.params.userId
  const result = await requestInformationService.getRequestInformationByUser(
    userId
  )
  res.json({status:200, msg:result})
}

export const updateRequestInformation = async (
  req: CustomRequest<IRequestInformationModel>,
  res: Response,
) => {
  const inquiry: IRequestInformationModel = req.body
  const result = await requestInformationService.updateRequestInformation(inquiry)
  res.json({ status: 200, msg: result })
}

export const getRequestInformationList = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) ?? 1
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) ?? 10
  const sortField = req.query.sortField as string
  const sortOrder = parseInt(req.query.sortOrder as string)
  const globalFilter = req.query.globalFilter as string
  const result = await requestInformationService.getRequestInformationList(
    page,
    itemsPerPage,
    sortField,
    sortOrder as SortOrder,
    globalFilter,
  )
  res.json({ status: 200, msg: result })
}

import { Request, Response } from 'express'
import * as certificationService from '../services/certificationService'
import { ICertificationModel } from '../models/certificationModel'

interface CustomRequest<T> extends Request {
  body: T
}

export const createCertification = async (req : CustomRequest<ICertificationModel>, res : Response) => {
  const newCert : ICertificationModel = req.body
  const result = await certificationService.createCertification(newCert)
  res.json({status:200, msg:result})
}

export const createBulkCertification = async (req : CustomRequest<ICertificationModel[]>, res : Response) => {
  const newCert : ICertificationModel[] = req.body
  const result = await certificationService.createBulkCert(newCert)
  res.json({status:200, msg:result})
}

export const updateCertification = async (req : CustomRequest<ICertificationModel>, res : Response) => {
  const newCert : ICertificationModel = req.body
  const result = await certificationService.updateCertification(newCert)
  res.json({status:200, msg:result})
}

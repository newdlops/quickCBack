import { Request, Response } from 'express'
import * as termsService from '../services/termsService'
import { ITermsModel } from '../models/termsModel'

interface CustomRequest<T> extends Request {
  body: T
}

export const createTerm = async (req : CustomRequest<ITermsModel>, res : Response) => {
  const newTerm: ITermsModel = req.body
  const result = await termsService.createTerm(newTerm)
  res.json({ status: 200, msg: result })
}

export const findTerm = async (req : CustomRequest<ITermsModel>, res : Response) => {
  const targetTerm: ITermsModel = req.body
  const result = await termsService.findTerms(targetTerm)
  res.json({ status: 200, msg: result })
}

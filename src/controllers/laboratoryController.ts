import { Request, Response } from 'express'
import { ILaboratoryModel } from '../models/laboratoryModel'
import * as laboratoryService from '../services/laboratoryService'
import { SortOrder } from 'mongoose'

interface CustomRequest<T> extends Request {
  body: T
}

export const createLaboratory = async (req : CustomRequest<ILaboratoryModel>, res : Response) => {
  const newLaboratory : ILaboratoryModel = req.body
  const result = await laboratoryService.createLaboratory(newLaboratory)
  res.json({status:200, msg:result})
}

export const updateLaboratory = async (req : CustomRequest<ILaboratoryModel>, res : Response) => {
  const newLaboratory : ILaboratoryModel = req.body
  const result = await laboratoryService.updateLaboratory(newLaboratory)
  res.json({status:200, msg:result})
}

export const findLaboratory = async (req : CustomRequest<ILaboratoryModel>, res : Response) => {
  const targetLaboratory : ILaboratoryModel = req.body
  const result = await laboratoryService.findLaboratory(targetLaboratory)
  res.json({status:200, msg:result})
}

export const getAllLaboratories = async (req : CustomRequest<ILaboratoryModel>, res : Response) => {
  const result = await laboratoryService.getAllLaboratories()
  res.json({status:200, msg:result})
}

export const findLaboratoryById = async (req : Request, res : Response) => {
  const laboratoryId = req.params.id
  const result = await laboratoryService.findLaboratoryById(laboratoryId)
  res.json({status:200, msg:result})
}

export const laboratorys = async (req : Request, res : Response) => {
  const page = parseInt(req.query.page as string) ?? 1
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) ?? 10
  const sortField = req.query.sortField as string
  const sortOrder = parseInt(req.query.sortOrder as string)
  const globalFilter = req.query.globalFilter as string
  const result = await laboratoryService.getLaboratories(page, itemsPerPage, sortField, sortOrder as SortOrder, globalFilter)
  res.json({status:200, msg:result})
}

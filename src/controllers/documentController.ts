import { Request, Response } from 'express'
import { IDocumentModel } from '../models/documentModel'
import * as documentService from '../services/documentService'
import { SortOrder } from 'mongoose'

interface CustomRequest<T> extends Request {
  body: T
}

export const createDocument = async (req : CustomRequest<IDocumentModel>, res : Response) => {
  const newDocument : IDocumentModel = req.body
  const result = await documentService.createDocument(newDocument)
  res.json({status:200, msg:result})
}

export const updateDocument = async (req : CustomRequest<IDocumentModel>, res : Response) => {
  const newDocument : IDocumentModel = req.body
  const result = await documentService.updateDocument(newDocument)
  res.json({status:200, msg:result})
}

export const findDocument = async (req : CustomRequest<IDocumentModel>, res : Response) => {
  const targetDocument : IDocumentModel = req.body
  const result = await documentService.findDocument(targetDocument)
  res.json({status:200, msg:result})
}

export const getAllDocument = async (req : CustomRequest<IDocumentModel>, res : Response) => {
  const result = await documentService.getAllDocument()
  res.json({status:200, msg:result})
}

export const findDocumentById = async (req : Request, res : Response) => {
  const DocumentId = req.params.id
  const result = await documentService.findDocumentById(DocumentId)
  res.json({status:200, msg:result})
}

export const documents = async (req : Request, res : Response) => {
  const page = parseInt(req.query.page as string) ?? 1
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) ?? 10
  const sortField = req.query.sortField as string
  const sortOrder = parseInt(req.query.sortOrder as string)
  const globalFilter = req.query.globalFilter as string
  const result = await documentService.getDocuments(page, itemsPerPage, sortField, sortOrder as SortOrder, globalFilter)
  res.json({status:200, msg:result})
}

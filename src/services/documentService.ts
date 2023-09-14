import DocumentModel, { IDocumentModel } from '../models/documentModel'
import { logger } from '../../config/logger'
import { SortOrder } from 'mongoose'

export async function createDocument(document: IDocumentModel) {
  try {
    const newDocument = new DocumentModel(document)
    return await newDocument.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateDocument(document: IDocumentModel) {
  try {
    const updatedDocument = await DocumentModel.findById(document._id)
    Object.keys(document).forEach(key => {
      updatedDocument[key] = document[key] as IDocumentModel
    })
    return await updatedDocument.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findDocument(document: IDocumentModel) {
  try {
    return await DocumentModel.findById(document.id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getAllDocument() {
  try {
    return await DocumentModel.find()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findDocumentById(id: string) {
  try {
    return await DocumentModel.findById(id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getDocuments(page: number, itemsPerPage: number, sortField: string, sortOrder: SortOrder, globalFilter: string) {
  const startIndex = (page) * itemsPerPage
  try {
    const sortcriteria = sortField ? { [sortField]: sortOrder} : null
    const filters = globalFilter ? { $or: [{ documentName: { $regex: globalFilter } }, { description: { $regex: globalFilter}}]} : null
    const result = await DocumentModel.find(filters).skip(startIndex).limit(itemsPerPage).sort(sortcriteria)
    const totalNumber = await DocumentModel.countDocuments()
    return { documents: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

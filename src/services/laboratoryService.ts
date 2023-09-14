import LaboratoryModel, { ILaboratoryModel } from '../models/laboratoryModel'
import { logger } from '../../config/logger'
import { SortOrder } from 'mongoose'

export async function createLaboratory(laboratory: ILaboratoryModel) {
  try {
    const newLaboratory = new LaboratoryModel(laboratory)
    return await newLaboratory.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateLaboratory(laboratory: ILaboratoryModel) {
  try {
    const updatedLaboratory = await LaboratoryModel.findById(laboratory._id)
    Object.keys(laboratory).forEach(key => {
      updatedLaboratory[key] = laboratory[key] as ILaboratoryModel
    })
    return await updatedLaboratory.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findLaboratory(laboratory: ILaboratoryModel) {
  try {
    return await LaboratoryModel.findById(laboratory.id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findLaboratoryById(id: string) {
  try {
    return await LaboratoryModel.findById(id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getLaboratories(page: number, itemsPerPage: number, sortField: string, sortOrder: SortOrder, globalFilter: string) {
  const startIndex = (page) * itemsPerPage
  try {
    const sortcriteria = sortField ? { [sortField]: sortOrder} : null
    const filters = globalFilter ? { $or: [{ laboratoryname: { $regex: globalFilter } }, { email: { $regex: globalFilter}}]} : null
    const result = await LaboratoryModel.find(filters).skip(startIndex).limit(itemsPerPage).sort(sortcriteria)
    const totalNumber = await LaboratoryModel.countDocuments()
    return { laboratorys: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getAllLaboratories() {
  try {
    return await LaboratoryModel.find()
  } catch (err) {
    logger.error('Error', err)
  }
}

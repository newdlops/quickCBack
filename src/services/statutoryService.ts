import { logger } from '../../config/logger'
import StatutoryModel, { IStatutoryModel } from '../models/statutoryModel'

export async function createStatutory(statutory: IStatutoryModel) {
  try {
    const newStatutory = new StatutoryModel(statutory)
    await newStatutory.save()
  } catch(err) {
    logger.error('Error', err)
  }
}

export async function updateProduct(statutory: IStatutoryModel) {
  try {
    const updatedProduct = await StatutoryModel.findById(statutory.id)
    Object.keys(statutory).forEach(key => {
      updatedProduct[key] = statutory[key] as IStatutoryModel
    })
    return await updatedProduct.save()
  } catch (err) {
    logger.error('Error', err)
  }
}
import { logger } from '../../config/logger'
import ProductModel, { IProductModel } from '../models/productModel'
import {SortOrder} from "mongoose"

export async function createProduct(product: IProductModel) {
  try {
    const newProduct = new ProductModel(product)
    return await newProduct.save()
  } catch(err) {
    logger.error('Error',err)
  }
}


export async function createProductBulk(product: IProductModel[]) {
  try {
    return await ProductModel.insertMany(product)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateProduct(product: IProductModel) {
  try {
    const updatedProduct = await ProductModel.findById(product._id)
    Object.keys(product).forEach(key => {
      updatedProduct[key] = product[key] as IProductModel
    })
    return await updatedProduct.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findProduct(keyword: string) {
  try {
    return await ProductModel.find({ productname: { $regex: `${keyword}` }}).lean()
  } catch(err) {
    logger.error(err)
  }
}

export async function findProductById(id: string) {
  try {
    return await ProductModel.findById(id)
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await ProductModel.findById(id)
    product.isDelete = true
    product.deletedAt = new Date()
    await product.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function deleteProducts(ids: string[]) {
  try {
    return await ProductModel.updateMany({_id: { $in: ids}}, { $set: {isDelete: true, deletedAt: Date.now()}})
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function getProducs(page: number, itemsPerPage: number, sortField: string, sortOrder: SortOrder, globalFilter: string) {
  const startIndex = (page) * itemsPerPage
  try {
    const sortcriteria = sortField ? { [sortField]: sortOrder} : null
    const filters = globalFilter ? { $or: [{ productname: { $regex: globalFilter } }, { keyword: { $regex: globalFilter}}]} : null
    const result = await ProductModel.find(filters).skip(startIndex).limit(itemsPerPage).sort(sortcriteria)
    const totalNumber = await ProductModel.countDocuments()
    return { products: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

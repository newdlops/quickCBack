import { logger } from '../../config/logger'
import ProductModel, { IProductModel } from '../models/productModel'

export async function createProduct(product: IProductModel) {
  try {
    const newProduct = new ProductModel(product)
    return await newProduct.save()
  } catch(err) {
    logger.error(err)
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
    const updatedProduct = await ProductModel.findById(product.id)
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

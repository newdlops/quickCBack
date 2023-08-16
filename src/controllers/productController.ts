import { Request, Response } from 'express'
import * as productService from '../services/productService'
import { IProductModel } from '../models/productModel'

interface CustomRequest<T> extends Request {
  body: T
}

export const createProduct = async (req : CustomRequest<IProductModel>, res : Response) => {
  const newProduct : IProductModel = req.body
  const result = await productService.createProduct(newProduct)
  res.json({status:200, msg:result})
}

export const createProductBulk = async (req : CustomRequest<IProductModel[]>, res : Response) => {
  const newProduct : IProductModel[] = req.body
  const result = await productService.createProductBulk(newProduct)
  res.json({status:200, msg:result})
}

export const findProduct = async (req : CustomRequest<{ keyword: string }>, res : Response) => {
  const keyword : string = req.body.keyword
  const result = keyword.length < 1 ? [] : await productService.findProduct(keyword)
  res.json({status:200, msg:result})
}
import { Request, Response } from 'express'
import * as productService from '../services/productService'
import { IProductModel } from '../models/productModel'
import {SortOrder} from "mongoose"

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

export const findProduct = async (req : Request, res : Response) => {
  const keyword : string = req.params.keyword
  const result = keyword.length < 1 ? [] : await productService.findProduct(keyword)
  res.json({status:200, msg:result})
}

export const findProductById = async (req : CustomRequest<{ id: string }>, res : Response) => {
  const id : string = req.body.id
  const result = id.length < 1 ? [] : await productService.findProductById(id)
  res.json({status:200, msg:result})
}

export const deleteProduct = async (req : Request, res : Response) => {
  const productId = req.params.id
  const result = await productService.deleteProduct(productId)
  res.json({status:200, msg:result})
}

export const products = async (req : Request, res : Response) => {
  const page = parseInt(req.query.page as string) ?? 1
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) ?? 10
  const sortField = req.query.sortField as string
  const sortOrder = parseInt(req.query.sortOrder as string)
  const globalFilter = req.query.globalFilter as string
  const result = await productService.getProducs(page, itemsPerPage, sortField, sortOrder as SortOrder, globalFilter)
  res.json({status:200, msg:result})
}

export const updateProduct = async (req : CustomRequest<IProductModel>, res : Response) => {
  const newProduct : IProductModel = req.body
  const result = await productService.updateProduct(newProduct)
  res.json({status:200, msg:result})
}

export const deleteProducts = async (req : CustomRequest<string[]>, res : Response) => {
  const productIds = req.body
  const result = await productService.deleteProducts(productIds)
  res.json({status:200, msg: result})
}

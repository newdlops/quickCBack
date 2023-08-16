import express from 'express'
import * as ProductController from '../controllers/productController'
import asyncHandler from '../util/asynchandle'
const productRouter = express.Router()

productRouter.post('/create', asyncHandler(ProductController.createProduct))
productRouter.post('/createBulk', asyncHandler(ProductController.createProductBulk))
productRouter.post('/find', asyncHandler(ProductController.findProduct))


export default productRouter
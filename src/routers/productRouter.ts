import express from 'express'
import * as ProductController from '../controllers/productController'
import asyncHandler from '../util/asynchandle'
const productRouter = express.Router()

productRouter.post('/create', asyncHandler(ProductController.createProduct))
productRouter.post('/createBulk', asyncHandler(ProductController.createProductBulk))
productRouter.get('/find/:keyword', asyncHandler(ProductController.findProduct))

productRouter.post('/product', asyncHandler(ProductController.createProduct))
productRouter.get('/product/:id', asyncHandler(ProductController.findProductById))
productRouter.get('/products', asyncHandler(ProductController.products))
productRouter.delete('/product/:id', asyncHandler(ProductController.deleteProduct))
productRouter.post('/delete', asyncHandler(ProductController.deleteProducts))
productRouter.put('/product/:id', asyncHandler(ProductController.updateProduct))

export default productRouter

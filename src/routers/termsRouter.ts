import express from 'express'
import * as termsController from '../controllers/termsController'
import asyncHandler from '../util/asynchandle'
const termsRouter = express.Router()

termsRouter.post('/create', asyncHandler(termsController.createTerm))
termsRouter.post('/find', asyncHandler(termsController.findTerm))

export default termsRouter

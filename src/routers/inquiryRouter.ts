import express from 'express'
import * as InquiryController from '../controllers/inquiryController'
import asyncHandler from '../util/asynchandle'
import { upload } from '../../config/s3'


const inquiryRouter = express.Router()

inquiryRouter.post('/inquiry', upload.array('files'), asyncHandler(InquiryController.createInquiry))
inquiryRouter.get(
  '/inquiry/:id',
  asyncHandler(InquiryController.getInquiryDetail),
)
inquiryRouter.get(
  '/inquiryByUser/:id',
  asyncHandler(InquiryController.findInquiryByUser),
)
inquiryRouter.get('/inquiries', asyncHandler(InquiryController.inquiries))
inquiryRouter.put('/inquiry/:id', upload.array('files'), asyncHandler(InquiryController.updateInquiry))

export default inquiryRouter

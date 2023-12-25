import express from 'express'
import * as FaqController from '../controllers/faqController'
import asyncHandler from '../util/asynchandle'
const faqRouter = express.Router()

faqRouter.post('/faq', asyncHandler(FaqController.createFaq))
faqRouter.get(
  '/faq/:id',
  asyncHandler(FaqController.getFaqDetail),
)
faqRouter.get('/faqs', asyncHandler(FaqController.getFaqs))
faqRouter.get('/faqList', asyncHandler(FaqController.getFaqList))
faqRouter.put('/faq/:id', asyncHandler(FaqController.updateFaq))

export default faqRouter

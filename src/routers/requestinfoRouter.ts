import express from 'express'
import * as RequestInformationController from '../controllers/requestinformationController'
import asyncHandler from '../util/asynchandle'
const requestInformationRouter = express.Router()

requestInformationRouter.post('/requestInformation', asyncHandler(RequestInformationController.createRequestInformation))
requestInformationRouter.get(
  '/requestInformation/:userId',
  asyncHandler(RequestInformationController.getRequestInformationByUser),
)
requestInformationRouter.get('/requestInformations', asyncHandler(RequestInformationController.getRequestInformations))
requestInformationRouter.get('/requestInformationList', asyncHandler(RequestInformationController.getRequestInformationList))
requestInformationRouter.put('/requestInformation/:id', asyncHandler(RequestInformationController.updateRequestInformation))

export default requestInformationRouter

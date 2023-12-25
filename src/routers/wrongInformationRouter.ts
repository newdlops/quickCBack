import express from 'express'
import * as WrongInformationController from '../controllers/wrongInformationController'
import asyncHandler from '../util/asynchandle'
const wrongInformationRouter = express.Router()

wrongInformationRouter.post('/wrongInformation', asyncHandler(WrongInformationController.createWrongInformation))
wrongInformationRouter.get(
  '/wrongInformation/:userId',
  asyncHandler(WrongInformationController.getWrongInformationByUser),
)
wrongInformationRouter.get('/wrongInformations', asyncHandler(WrongInformationController.getWrongInformations))
wrongInformationRouter.get('/wrongInformationList', asyncHandler(WrongInformationController.getWrongInformationList))
wrongInformationRouter.put('/wrongInformation/:id', asyncHandler(WrongInformationController.updateWrongInformation))

export default wrongInformationRouter

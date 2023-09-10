import express from 'express'
import * as LaboratoryController from '../controllers/laboratoryController'
import asyncHandler from '../util/asynchandle'
const laboratoryRouter = express.Router()

laboratoryRouter.post('/laboratory', asyncHandler(LaboratoryController.createLaboratory))
laboratoryRouter.get('/laboratory/:id', asyncHandler(LaboratoryController.findLaboratoryById))
laboratoryRouter.get('/laboratorys', asyncHandler(LaboratoryController.laboratorys))
laboratoryRouter.put('/laboratory/:id', asyncHandler(LaboratoryController.updateLaboratory))

export default laboratoryRouter
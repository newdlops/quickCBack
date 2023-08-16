import express from 'express'
import * as CertController from '../controllers/certificationController'
import asyncHandler from '../util/asynchandle'
const certRouter = express.Router()

certRouter.post('/create', asyncHandler(CertController.createCertification))
certRouter.post('/createBulk', asyncHandler(CertController.createBulkCertification))
certRouter.post('/update', asyncHandler(CertController.updateCertification))

export default certRouter
import express from 'express'
import * as DocumentController from '../controllers/documentController'
import asyncHandler from '../util/asynchandle'
const documentRouter = express.Router()

documentRouter.post('/document', asyncHandler(DocumentController.createDocument))
documentRouter.get('/document/:id', asyncHandler(DocumentController.findDocumentById))
documentRouter.get('/documents', asyncHandler(DocumentController.documents))
documentRouter.put('/document/:id', asyncHandler(DocumentController.updateDocument))
documentRouter.get('/getAllDoc', asyncHandler(DocumentController.getAllDocument))

export default documentRouter

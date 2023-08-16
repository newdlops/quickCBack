import express from 'express'
import * as ProjectController from '../controllers/projectController'
import asyncHandler from '../util/asynchandle'
const projectRouter = express.Router()

projectRouter.post('/create', asyncHandler(ProjectController.createProject))
projectRouter.post('/findByUser', asyncHandler(ProjectController.findProjectByUser))
projectRouter.post('/getDetail', asyncHandler(ProjectController.getProjectDetail))

export default projectRouter
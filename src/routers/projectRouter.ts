import express from 'express'
import * as ProjectController from '../controllers/projectController'
import asyncHandler from '../util/asynchandle'
const projectRouter = express.Router()

projectRouter.post('/create', asyncHandler(ProjectController.createProject))
projectRouter.post('/findByUser', asyncHandler(ProjectController.findProjectByUser))
projectRouter.post('/getDetail', asyncHandler(ProjectController.getProjectDetail))

projectRouter.post('/project', asyncHandler(ProjectController.createProject))
projectRouter.get('/project/:id', asyncHandler(ProjectController.findProjectByUser))
projectRouter.get('/projects', asyncHandler(ProjectController.projects))
projectRouter.put('/project/:id', asyncHandler(ProjectController.updateProject))

export default projectRouter

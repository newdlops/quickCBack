import express from 'express'
import * as ProjectItemController from '../controllers/projectItemController'
import asyncHandler from '../util/asynchandle'
const projectItemRouter = express.Router()

projectItemRouter.post('/create', asyncHandler(ProjectItemController.createProjectItem))
projectItemRouter.post('/createBulk', asyncHandler(ProjectItemController.createProjectItemBulk))
projectItemRouter.post('/findByProject', asyncHandler(ProjectItemController.findProjectItemByProject))
projectItemRouter.put('/projectItem/:id', asyncHandler(ProjectItemController.updateProjectItem))

export default projectItemRouter

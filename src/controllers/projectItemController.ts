import { Request, Response } from 'express'
import * as projectItemService from '../services/projectItemService'
import { IProjectItemModel } from '../models/projectItemModel'
import { IProjectModel } from '../models/projectModel'

interface CustomRequest<T> extends Request {
  body: T
}

export const createProjectItem = async (req : CustomRequest<IProjectItemModel>, res : Response) => {
  const newProjectItem : IProjectItemModel = req.body
  const result = await projectItemService.createProjectItem(newProjectItem)
  res.json({status:200, msg:result})
}

export const createProjectItemBulk = async (req : CustomRequest<IProjectItemModel[]>, res : Response) => {
  const newProjectItem : IProjectItemModel[] = req.body
  const result = await projectItemService.createProjectItemBulk(newProjectItem)
  res.json({status:200, msg:result})
}

export const findProjectItemByProject = async (req : CustomRequest<IProjectModel>, res : Response) => {
  const project : IProjectModel = req.body
  const result = await projectItemService.findProjectItemByProject(project)
  res.json({status:200, msg:result})
}

export const updateProjectItem = async (req : CustomRequest<IProjectItemModel>, res : Response) => {
  const projectItem : IProjectItemModel = req.body
  const result = await projectItemService.updateProjectItem(projectItem)
  res.json({status:200, msg:result})
}

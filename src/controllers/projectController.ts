import { Request, Response } from 'express'
import * as projectService from '../services/projectService'
import { IProjectModel } from '../models/projectModel'
import { IUserModel } from '../models/userModel'

interface CustomRequest<T> extends Request {
  body: T
}

export const createProject = async (req : CustomRequest<IProjectModel>, res : Response) => {
  const newProject : IProjectModel = req.body
  const result = await projectService.createProject(newProject)
  res.json({status:200, msg:result})
}

export const findProjectByUser = async (req : CustomRequest<IUserModel>, res : Response) => {
  const user : IUserModel = req.body
  const result = await projectService.findProjectByUser(user)
  res.json({status:200, msg:result})
}

export const getProjectDetail = () => {
}
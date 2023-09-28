import { Request, Response } from 'express'
import * as projectService from '../services/projectService'
import { IProjectModel } from '../models/projectModel'
import { IUserModel } from '../models/userModel'
import {SortOrder} from "mongoose"

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
  const result = await projectService.findProjectsByUser(user)
  res.json({status:200, msg:result})
}

export const getProjectDetail = async (req : CustomRequest<IProjectModel>, res : Response) => {
  const project : IProjectModel = req.body
  const result = await projectService.getProjectDetail(project)
  res.json({status:200, msg:result})
}

export const updateProject = async (req : CustomRequest<IProjectModel>, res : Response) => {
  const project : IProjectModel = req.body
  const result = await projectService.updateProject(project)
  res.json({status:200, msg:result})
}

export const projects = async (req : Request, res : Response) => {
  const page = parseInt(req.query.page as string) ?? 1
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) ?? 10
  const sortField = req.query.sortField as string
  const sortOrder = parseInt(req.query.sortOrder as string)
  const globalFilter = req.query.globalFilter as string
  const result = await projectService.getProjects(page, itemsPerPage, sortField, sortOrder as SortOrder, globalFilter)
  res.json({status:200, msg:result})
}

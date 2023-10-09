import { logger } from '../../config/logger'
import ProjectModel, { IProjectModel } from '../models/projectModel'
import * as userService from '../services/userService'
import * as projectItemService from '../services/projectItemService'
import { SortOrder } from 'mongoose'
import { ObjectId } from 'mongodb'

export async function createProject(form: IProjectModel) {
  try {
    const newProject = new ProjectModel(form)
    return await newProject.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function updateProject(project: IProjectModel) {
  try {
    const updatedProject = await ProjectModel.findById(project._id)
    Object.keys(project).forEach(key => {
      updatedProject[key] = project[key] as IProjectModel
    })
    return await updatedProject.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findProjectsByUser(userid: string){
  try {
    const projectUser = await userService.findUserById(userid)
    return await ProjectModel.find({ requestUser: projectUser }).lean()
  }
  catch (err) {
    logger.error('Error', err)
  }
}

export async function getProjectDetail(project: IProjectModel) {
  try {
    const projectItemList = await projectItemService.findProjectItemByProject(project)
    const result = await ProjectModel.findById(project._id).lean()
    result.projectItems = [...projectItemList]
    return result
  }
  catch (err) {
    logger.error('Error', err)
  }
}

export async function getProjects(page: number, itemsPerPage: number, sortField: string, sortOrder: SortOrder, globalFilter: string) {
  const startIndex = (page) * itemsPerPage
  try {
    const sortcriteria = sortField ? { [sortField]: sortOrder} : null
    const filters = globalFilter ? { $or: [{ projectname: { $regex: globalFilter } }, { projectNumber: { $regex: globalFilter}}, (globalFilter.length == 24 ? { _id: { $eq: new ObjectId(globalFilter) } }: { none: "" })]} : null
    const result = await ProjectModel.find(filters).skip(startIndex).limit(itemsPerPage).sort(sortcriteria).populate('requestUser')
    const totalNumber = await ProjectModel.countDocuments()
    return { projects: result, totalNumber: totalNumber }
  } catch (err) {
    logger.error('Error', err)
  }
}

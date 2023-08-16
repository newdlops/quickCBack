import { logger } from '../../config/logger'
import ProjectModel, { IProjectModel } from '../models/projectModel'
import { IUserModel } from '../models/userModel'
import * as userService from '../services/userService'
import * as projectItemService from '../services/projectItemService'

export async function createProject(form: IProjectModel) {
  try {
    const newProject = new ProjectModel(form)
    return await newProject.save()
  } catch(err) {
    logger.error(err)
  }
}

export async function updateProject(project: IProjectModel) {
  try {
    const updatedProject = await ProjectModel.findById(project.id)
    Object.keys(project).forEach(key => {
      updatedProject[key] = project[key] as IProjectModel
    })
    return await updatedProject.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findProjectsByUser(user: IUserModel){
  try {
    const projectUser = await userService.findUser(user)
    const result = await ProjectModel.find({ requestUser: projectUser }).lean()
    return result
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
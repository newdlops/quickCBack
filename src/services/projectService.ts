import { logger } from '../../config/logger'
import ProjectModel, { IProjectModel } from '../models/projectModel'
import { IUserModel } from '../models/userModel'
import * as userService from '../services/userService'

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
    const updatedProduct = await ProjectModel.findById(project.id)
    Object.keys(project).forEach(key => {
      updatedProduct[key] = project[key] as IProjectModel
    })
    return await updatedProduct.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findProjectByUser(user: IUserModel) {
  try {
    const projectUser = await userService.findUser(user)
    return await ProjectModel.find({ requestUser: projectUser }).lean()
  } catch (err) {
    logger.error('Error', err)
  }
}
import { logger } from '../../config/logger'
import ProjectModel, { IProjectModel as IProdjectItemModel, IProjectModel } from '../models/projectModel'
import ProjectItemModel, { IProjectItemModel } from '../models/projectItemModel'

export async function createProjectItem(projectItem: IProjectItemModel) {
  try {
    const newProjectItem = new ProjectItemModel(projectItem)
    return await newProjectItem.save()
  } catch(err) {
    logger.error('Error', err)
  }
}

export async function createProjectItemBulk(projectItem: IProjectItemModel[]) {
  try {
    return await ProjectItemModel.insertMany(projectItem)
  } catch(err) {
    logger.error('Error', err)
  }
}

export async function updateProjectItem(projectItem: IProjectItemModel) {
  try {
    const updatedProjectItem = await ProjectItemModel.findById(projectItem._id)
    Object.keys(projectItem).forEach(key => {
      updatedProjectItem[key] = projectItem[key] as IProjectItemModel
    })
    return await updatedProjectItem.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

export async function findProjectItemByProject(project: IProjectModel) {
  try {
    return await ProjectItemModel.find({ project: project }).lean()
  } catch (err) {
    logger.error('Error', err)
  }
}

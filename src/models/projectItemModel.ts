import mongoose, { Schema, Document } from 'mongoose'
import { IProjectModel } from './projectModel'
import { IUserModel } from './userModel'

export interface IProjectItemModel extends Document {
  id?: string;
  projectItemName: string;
  checkdate: Date;
  sample: boolean;
  document: boolean;
  processedStage: string;
  requestUser: IUserModel;
  status: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  project: IProjectModel;
}


const projectItemSchema = new Schema({
  projectItemName: { type: String, required: false},
  /* 견적 확인일자 */
  checkdate: { type: Date, default: Date.now, required: true },
  /* 시료 준비(완/미완) */
  sample: { type: Boolean, default: false, required: false},
  /* 문서 준비(완/미완) */
  document: { type: Boolean, default: false, required: false},
  /* 진행단계 */
  processedStage: { type: String, required: false},
  /* 요청자 */
  requestUser: { type: Schema.Types.ObjectId, ref: 'User', required: false},
  /* 상태(완/미완) */
  status: { type: Boolean, default: false, require: false},
  description: { type: String, required: false},
  /* 프로젝트 */
  project: { type: Schema.Types.ObjectId, ref: 'Project', require: true },
}, { timestamps: true })

const ProjectItemModel = mongoose.model<IProjectItemModel>('ProjectItem', projectItemSchema)

export default ProjectItemModel
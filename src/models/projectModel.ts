import mongoose, { Schema, Document } from 'mongoose'
import { IProjectItemModel } from './projectItemModel'
import { IUserModel } from './userModel'

export interface IProjectModel extends Document {
  _id?: string
  projectname: string
  requestUser: IUserModel
  modelName: string
  manufacture: string
  projectNumber: string
  projectStartDate: Date
  projectStatus: boolean
  projectItems: IProjectItemModel[]
  createdAt: Date
  updatedAt: Date
  checkDate: Date
  certType: string[]
  photos: string[]
}

const projectSchema = new Schema(
  {
    /* 프로젝트명 */
    projectname: { type: String, required: true },
    /* 신청인 */
    requestUser: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    /* 모델명 */
    modelName: { type: String, required: false },
    /* 제조사 */
    manufacture: { type: String, required: false },
    /* 프로젝트번호 */
    projectNumber: { type: String, required: false },
    /* 프로젝트시작일 */
    projectStartDate: { type: Date, required: false },
    /* 프로젝트확인일 */
    checkDate: { type: Date, required: false },
    /* 프로젝트상태(완/미완) */
    projectStatus: { type: Boolean, required: false },
    /* 프로젝트 아이템 */
    projectItems: [
      { type: Schema.Types.ObjectId, ref: 'ProjectItem', required: false },
    ],
    /* 인증구분 */
    certType: [{ type: String, required: false }],
    /* 제품명 */
    productName: { type: String, required: false },
    /* 문의내용 */
    content: { type: String, required: false },
    /* 신청인 */
    user: { type: String, required: false },
    /* 답변내용 */
    reply: { type: String, required: false },
    /* 신청인 연락처 */
    contact: { type: String, required: false },
    photos: [{ type: String, required: false }],
  },
  { timestamps: true },
)

const ProjectModel = mongoose.model<IProjectModel>('Project', projectSchema)

export default ProjectModel

import mongoose, { Schema, Document } from 'mongoose'
import { IUserModel } from './userModel'

export interface IRequestInformationModel extends Document {
  _id?: string
  title: string
  content: string
  productName: string
  requestUser: IUserModel
  reply: string
}

const requestInformationSchema = new Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: false },
    productName: { type: String, required: false },
    requestUser: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    reply: { type: String, required: false },
  },
  { timestamps: true },
)

const RequestInformationModel = mongoose.model<IRequestInformationModel>('RequestInformation', requestInformationSchema)

export default RequestInformationModel

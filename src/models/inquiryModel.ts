import mongoose, { Schema, Document } from 'mongoose'
import { IUserModel } from './userModel'

/* 프로젝트에 합침, 사용하지 않으나 남겨둠 */
export interface IInquiryModel extends Document {
  _id?: string
  name: string
  productName: string
  manufactureName: string
  content: string
  requestUser: IUserModel
  reply: string
  contact: string
}

const inquirySchema = new Schema(
  {
    name: { type: String, required: false },
    productName: { type: String, required: true },
    content: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reply: { type: String, required: false},
    contact: { type: String, required: true },
  },
  { timestamps: true },
)

const InquiryModel = mongoose.model<IInquiryModel>('Inquiry', inquirySchema)

export default InquiryModel

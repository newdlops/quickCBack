import mongoose, { Schema, Document } from 'mongoose'

export interface INoticeModel extends Document {
  _id?: string
  title: string
  content: string
}

const noticeSchema = new Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: false },
  },
  { timestamps: true },
)

const NoticeModel = mongoose.model<INoticeModel>('Notice', noticeSchema)

export default NoticeModel

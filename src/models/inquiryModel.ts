import mongoose, { Schema, Document } from 'mongoose'

export interface IInquiryModel extends Document {
  _id?: string
  name: string
  productName: string
  content: string
  user: string
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

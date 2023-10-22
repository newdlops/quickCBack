import mongoose, { Schema, Document } from 'mongoose'

export interface ITermsModel extends Document {
  _id?: string
  title: string
  content: string
  version: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}


const TermsSchema = new Schema({
  title: { type: String, required: false },
  content: { type: String, required: false },
  version: { type: String, required: false },
}, { timestamps: true })

const TermsModel = mongoose.model<ITermsModel>('Terms', TermsSchema)

export default TermsModel

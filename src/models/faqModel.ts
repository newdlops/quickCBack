import mongoose, { Schema, Document } from 'mongoose'

export interface IFaqModel extends Document {
  _id?: string
  question: string
  answer: string
}

const faqSchema = new Schema(
  {
    question: { type: String, required: false },
    answer: { type: String, required: false },
  },
  { timestamps: true },
)

const FaqModel = mongoose.model<IFaqModel>('Faq', faqSchema)

export default FaqModel

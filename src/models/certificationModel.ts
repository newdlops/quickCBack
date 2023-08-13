import mongoose, { Schema, Document } from 'mongoose'

export interface ICertificationModel extends Document {
  productname: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}


const cetificationSchema = new Schema({
  productname: { type: String, required: true },
  description: { type: String, required: false },
}, { timestamps: true })

const CertificationModel = mongoose.model<ICertificationModel>('Certification', cetificationSchema)

export default CertificationModel
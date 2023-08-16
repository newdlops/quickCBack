import mongoose, { Schema, Document } from 'mongoose'

export interface ICertificationModel extends Document {
  id?:string;
  productname: string;
  certCategory: string;
  productCategory: string;
  canSubstitution: boolean;
  sample: string;
  period: string;
  expectedCost: string;
  requiredDocuments: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}


const cetificationSchema = new Schema({
  productname: { type: String, required: true },
  certCategory: { type: String, required: false },
  productCategory: { type: String, required: false },
  canSubstitution: { type: Boolean, required: false },
  sample: { type: String, required: false },
  period: { type: String, required: false },
  expectedCost: { type: String, required: false },
  requiredDocuments: { type: String, required: false },
  description: { type: String, required: false },
}, { timestamps: true })

const CertificationModel = mongoose.model<ICertificationModel>('Certification', cetificationSchema)

export default CertificationModel
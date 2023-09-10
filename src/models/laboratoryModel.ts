import mongoose, { Schema, Document } from 'mongoose'

export interface ILaboratoryModel extends Document {
  id?:string;
  laboratoryName: string;
  laboratoryEngName: string;
  telephoneNumber: string;
  address: string;
  homepageUrl: string;
  workScope: string;
  description: string;
}

const laboratorySchema = new Schema({
  laboratoryName: { type: String, required: true },
  laboratoryEngName: { type: String, required: false },
  telephoneNumber: { type: String, required: false },
  address: { type: String, required: false },
  homepageUrl: { type: String, required: false },
  workScope: { type: String, required: false},
  description: { type: String, required: false },
}, { timestamps: true })

const LaboratoryModel = mongoose.model<ILaboratoryModel>('Laboratory', laboratorySchema)

export default LaboratoryModel
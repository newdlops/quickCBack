import mongoose, { Schema, Document } from 'mongoose'

export interface IStatutoryModel extends Document {
  id?: string;
  statutoryname: string;
  department: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}


const statutorySchema = new Schema({
  /* 근거법령명 */
  statutoryname: { type: String, required: true },
  /* 주관부처 */
  department: { type: String, required: false},
  /* 법령의 자세한 내용 */
  description: { type: String, required: false},
}, { timestamps: true })

const StatutoryModel = mongoose.model<IStatutoryModel>('Statutory', statutorySchema)

export default StatutoryModel
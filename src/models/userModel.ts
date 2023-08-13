import mongoose, { Schema, Document } from 'mongoose'

export interface IUserModel extends Document {
  id?: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isDelete: boolean;
  deletedAt: Date;
}


const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  isDelete: { type: Boolean, default: false, required: false},
  deletedAt: { type: Date, required: false},
}, { timestamps: true })

const UserModel = mongoose.model<IUserModel>('User', userSchema)

export default UserModel
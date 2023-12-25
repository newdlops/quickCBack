import mongoose, { Schema, Document } from 'mongoose'

export interface IUserModel extends Document {
  id?: string
  username: string
  password: string
  accessToken?: string
  accessTokenExpiredAt?: Date
  email: string
  createdAt: Date
  updatedAt: Date
  isDelete: boolean
  deletedAt: Date
  phone: string
  isAdmin: boolean
}


const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: { type: String, required: false },
  accessTokenExpiredAt: { type: Date, required: false},
  email: { type: String, required: false },
  isDelete: { type: Boolean, default: false, required: false},
  deletedAt: { type: Date, required: false },
  phone: { type: String, require: false },
  isAdmin: { type: Boolean, require: false, default: false },
}, { timestamps: true })

const UserModel = mongoose.model<IUserModel>('User', userSchema)

export default UserModel

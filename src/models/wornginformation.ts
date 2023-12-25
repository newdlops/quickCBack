import mongoose, { Schema, Document } from 'mongoose'
import { IUserModel } from './userModel'
import { IProductModel } from './productModel'

export interface IWrongInformationModel extends Document {
  _id?: string
  title: string
  content: string
  productName: string
  requestUser: IUserModel
  product: IProductModel
  reply: string
}

const wrongInformationSchema = new Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: false },
    productName: { type: String, required: false },
    requestUser: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: false },
    reply: { type: String, required: false },
  },
  { timestamps: true },
)

const WrongInformationModel = mongoose.model<IWrongInformationModel>('WrongInformation', wrongInformationSchema)

export default WrongInformationModel

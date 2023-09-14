import mongoose, { Schema, Document } from 'mongoose'
import {IDocumentModel} from "./documentModel"
// import { ICertificationModel } from './certificationModel'

export interface IProductModel extends Document {
  id?: string;
  /* 제품명 */
  productname: string;
  // certificationCategory: ICertificationModel[];
  /* 인증구분 */
  certificationCategory: string;
  /* 키워드X */
  keyword: string;
  /* 제품분류 */
  category: string;
  /* 대체가능여부 */
  substitution: boolean;
  /* 샘플 */
  sample: string;
  /* 기간 */
  preiod: string;
  /* 예상견적가 */
  expectedCost: string;
  /* 필요문서x */
  requiredDocument: IDocumentModel[];
  /* 시험소 */
  testingLaboratory: string;
  /*팁 */
  tip: string;
  /* 설명 */
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  /* 삭제여부 */
  isDelete: boolean;
}


const productSchema = new Schema({
  /* 제품명 */
  productname: { type: String, required: true },
  keyword: { type: String, required: false },
  /* 인증구분 */
  // certificationCategory: [{ type: Schema.Types.ObjectId, ref:'Certification', required: false}],
  certificationCategory: { type: String, required: false},
  /* 품목 */
  category: { type: String, required: false},
  /* 구매대행 */
  substitution: { type: Boolean, required: false},
  /* 샘플 */
  sample: { type: String, required: false},
  /* 기간 */
  period: { type: String, required: false},
  /* 예상비용 */
  expectedCost: { type: String, required: false},
  /* 필요문서 */
  requiredDocument: [{ type: Schema.Types.ObjectId, ref: 'Document', required: false}],
  /* 시험소 */
  testingLaboratory: [{ type: Schema.Types.ObjectId, ref: 'Laboratory', required: false}],
  /* 팁 */
  tip: { type: String, required: false },
  description: { type: String, required: false },
  isDelete: { type: Boolean, required: false },
  deletedAt: { type: Date, required: false },
}, { timestamps: true })

const ProductModel = mongoose.model<IProductModel>('Product', productSchema)

export default ProductModel

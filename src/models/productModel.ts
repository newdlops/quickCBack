import mongoose, { Schema, Document } from 'mongoose'
// import { ICertificationModel } from './certificationModel'

export interface IProductModel extends Document {
  id?: string;
  productname: string;
  // certificationCategory: ICertificationModel[];
  certificationCategory: string;
  keyword: string;
  category: string;
  substitution: boolean;
  sample: string;
  preiod: string;
  expectedCost: string;
  requiredDocument: string[];
  testingLaboratory: string;
  tip: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}


const productSchema = new Schema({
  /* 제품명 */
  productname: { type: String, required: true },
  keyword: { type: String, required: true },
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
  requiredDocument: [{ type: String, required: false}],
  /* 시험소 */
  testingLaboratory: { type: String, required: false },
  /* 팁 */
  tip: { type: String, required: false },
}, { timestamps: true })

const ProductModel = mongoose.model<IProductModel>('Product', productSchema)

export default ProductModel
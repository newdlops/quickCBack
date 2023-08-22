import mongoose, { Schema, Document } from 'mongoose'

export interface IDocumentModel extends Document {
  id?:string;
  documentName: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema({
  documentName: { type: String, required: true },
  description: { type: String, required: false },
  imageUrl: [{ type: String, required: false }],
}, { timestamps: true })

const DocumentModel = mongoose.model<IDocumentModel>('Document', documentSchema)

export default DocumentModel
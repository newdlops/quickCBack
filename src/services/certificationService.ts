import { logger } from '../../config/logger'
import CertificationModel, { ICertificationModel } from '../models/certificationModel'


export async function createCertification(cert: ICertificationModel) {
  try {
    const newCert = new CertificationModel(cert)
    return await newCert.save()
  } catch(err) {
    logger.error('Error', err)
  }
}

export async function createBulkCert(certs: ICertificationModel[]) {
  try {
    const newCerts = await CertificationModel.insertMany(certs)
    return newCerts
  } catch(err) {
    logger.error('Error', err)
  }
}
export async function updateCertification(cert: ICertificationModel) {
  try {
    const updatedCert = await CertificationModel.findById(cert.id)
    Object.keys(cert).forEach(key => {
      updatedCert[key] = cert[key] as ICertificationModel
    })
    return await updatedCert.save()
  } catch (err) {
    logger.error('Error', err)
  }
}

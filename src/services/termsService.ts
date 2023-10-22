import { logger } from '../../config/logger'
import TermsModel, { ITermsModel } from '../models/termsModel'

export const findTerms = async (term: ITermsModel) => {
  try {
    const privacyPolicy = await TermsModel.findOne({ version: { $eq: term.version }})
    return privacyPolicy
  } catch (err) {
    logger.error('Error', err)
  }
}

export const createTerm = async (terms: ITermsModel) => {
  try {
    const newPrivacyPolicy = new TermsModel(terms)
    const privacyPolicy = await newPrivacyPolicy.save()
    return privacyPolicy
  } catch (err) {
    logger.error('Error', err)
  }
}

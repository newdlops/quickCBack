import process from 'process'

class QuickCConfig {
  mongodbId: string
  mongodbPass: string
  mongodbLocalId: string
  mongodbLocalPass: string
  mongodbhost: string

  constructor(){
    this.mongodbLocalId = process.env.DB_USER
    this.mongodbLocalPass = process.env.DB_PASSWORD
    this.mongodbhost = process.env.DB_HOST
  }

  getDBURL(){
    return process.env.QUICKC_PRODUCTION ?
      `mongodb://${this.mongodbId}:${this.mongodbPass}@${this.mongodbhost}`
      : `mongodb://${this.mongodbLocalId}:${this.mongodbLocalPass}@${this.mongodbhost}`
  }
}

export default new QuickCConfig()

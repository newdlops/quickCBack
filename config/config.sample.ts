import process from 'process'
/* mongodb 접속 환경 설정용 클래스
접속정보를 채워넣어 config/config.ts로 파일이름을 변경하여 사용 */
class QuickCConfig {
  mongodbId: string
  mongodbPass: string
  mongodbLocalId: string
  mongodbLocalPass: string
  mongodbhost: string

  constructor(){
    this.mongodbLocalId = '...'
    this.mongodbLocalPass = '...'
    this.mongodbhost = 'nnn.nnn.nnn.nnn:27017'
  }

  getDBURL(){
    return process.env.QUICKC_PRODUCTION ?
      `mongodb://${this.mongodbId}:${this.mongodbPass}@${this.mongodbhost}`
      : `mongodb://${this.mongodbLocalId}:${this.mongodbLocalPass}@${this.mongodbhost}`
  }
}

export default new QuickCConfig()
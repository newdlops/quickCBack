import morgan from 'morgan'
import { logger } from './logger'

// 로그 작성을 위한 Output stream옵션.
const stream = {
  write: (message) => {
    logger.info(message)
  },
}

// 로깅 스킵 여부 (만일 배포환경이면, 코드가 400 미만라면 함수를 리턴해 버려서 로그 기록 안함. 코드가 400 이상이면 로그 기록함)
const skip = (_, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.ststusCode < 400
  }
  return false
}

//? 적용될 moran 미들웨어 형태
export const morganMiddleware = morgan('combined', { stream, skip })
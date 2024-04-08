import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import Database from '../config/database'
import userRouter from './routers/userRouter'
import { logger } from '../config/logger'
import { morganMiddleware } from '../config/morgan'
import productRouter from './routers/productRouter'
import projectRouter from './routers/projectRouter'
import projectItemRouter from './routers/projectItemRouter'
import certRouter from './routers/certificationRouter'
import cors from 'cors'
import documentRouter from './routers/documentRouter'
import laboratoryRouter from './routers/laboratoryRouter'
import inquiryRouter from './routers/inquiryRouter'
import termsRouter from './routers/termsRouter'
import noticeRouter from './routers/noticeRouter'
import faqRouter from './routers/faqRouter'
import wrongInformationRouter from './routers/wrongInformationRouter'
import requestInformationRouter from './routers/requestinfoRouter'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const app = express()
const PORT = 3000

const clientWebServerUrl = 'http://admin.quickc.co.kr'

/*
  스웨거 설정
*/
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: '퀵씨 API테스트 페이지',
      version: '0.1.0',
      description: '퀵씨 API 테스트 페이지입니다.',
      contact: {
        name: 'QuickC',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'local environment',
      },
      {
        url: 'https://api.quickc.co.kr',
        description: 'dev server',
      },
    ],
  },
  apis: ['./router/*.js', './swagger/*.yaml'],
}
const specs = swaggerJsdoc(options)

const corsOptions = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:8080',
    'http://localhost:8082',
    'https://api.quickc.co.kr',
    'http://api.quickc.co.kr',
    'https://quickc.co.kr',
    'http://quickc.co.kr',
    'http://admin.quickc.co.kr',
    'https://admin.quickc.co.kr',
    'http://222.110.24.169',
  ],
}
app.use(cors(corsOptions))
app.use(
  express.json({
    limit: `100mb`,
  }),
)
app.use(morganMiddleware)
//스웨거 페이지
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/project', projectRouter)
app.use('/projectItem', projectItemRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/document', documentRouter)
app.use('/cert', certRouter)
app.use('/laboratory', laboratoryRouter)
app.use('/inquiry', inquiryRouter)
app.use('/terms', termsRouter)
app.use('/notice', noticeRouter)
app.use('/faq', faqRouter)
app.use('/wrongInformation', wrongInformationRouter)
app.use('/requestInformation', requestInformationRouter)

app.use(
  createProxyMiddleware({
    target: clientWebServerUrl,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      // API 요청이 아닌 경우, 원래 경로를 유지합니다.
      return path
    },
    router: {
      // 필요에 따라 동적으로 타겟을 변경할 수 있습니다.
    },
  }),
)

const connectDB = new Database()
connectDB
  .initDb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`서버가 http://localhost:${PORT}에서 시작되었습니다.`)
    })
  })
  .catch(e => logger.info('d', e))

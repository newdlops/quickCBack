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

export const app = express()
const PORT = 3000

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
        url: 'https://api.zoodoongi.net',
        description: 'dev server',
      },
    ],
  },
  apis: ['./router/*.js', './swagger/*.yaml'],
}
const specs = swaggerJsdoc(options)

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

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!')
})

const connectDB = new Database()
connectDB
  .initDb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`서버가 http://localhost:${PORT}에서 시작되었습니다.`)
    })
  })
  .catch(e => logger.info('d', e))

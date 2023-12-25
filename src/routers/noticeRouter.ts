import express from 'express'
import * as NoticeController from '../controllers/noticeController'
import asyncHandler from '../util/asynchandle'
const noticeRouter = express.Router()

noticeRouter.post('/notice', asyncHandler(NoticeController.createNotice))
noticeRouter.get(
  '/notice/:id',
  asyncHandler(NoticeController.getNoticeDetail),
)
noticeRouter.get('/notices', asyncHandler(NoticeController.getNotices))
noticeRouter.get('/noticeList', asyncHandler(NoticeController.getNoticeList))
noticeRouter.put('/notice/:id', asyncHandler(NoticeController.updateNotice))
noticeRouter.get(
  '/recentNotice',
  asyncHandler(NoticeController.getRecentNotice),
)

export default noticeRouter

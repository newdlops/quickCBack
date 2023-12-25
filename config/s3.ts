import multer from 'multer'
import path from 'path'
import AWS from 'aws-sdk'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

export const upload = multer({ storage: storage })


export const aws = AWS.config.update({
  region: 'ap-northeast-2',
})

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack)
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId)
  }
})

export const s3 = new AWS.S3()

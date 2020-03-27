import express, { Express, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose' // 连接数据库的
import cors from 'cors' // 用来跨域的
import morgan from 'morgan' // 这是用来输入访问日志的
import helmet from 'helmet' // 用来进行安全过滤的
import multer from 'multer' // 上传头像
import 'dotenv/config' // 这是包的作用是读取.env文件然后写入process.env.JWT_SECRET_KEY
import path from 'path'

import errorMiddleware from './middlewares/errorMiddleware'
import HttpException from './exceptions/HttpException'
import * as userController from './controllers/userController'

//指定上传文件的存储空间
const storage = multer.diskStorage({
  //指定上传的目录
  destination: path.join(__dirname, 'public', 'uploads'),
  filename(_req: Request, file: Express.Multer.File, callback) {
    // callback 第二个参数是文件名 时间戳.jpg
    callback(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

const app: Express = express()

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public'))) // 渲染public下面的文件
app.use(express.json()) // express.json = bodyParser.json  var json: typeof bodyParser.json;

app.get('/', (_req, res, _next) => {
  res.json({
    success: true,
    data: 'hello world'
  })
})

app.post('/user/register', userController.register)
app.post('/user/login', userController.login)
// 客户端把token传递给服务器，服务器返回当前的用户，如果token不合法或过期，则返回null
app.get('/user/validate', userController.validate)

//当服务器端接收到上传文件请求的时候，处理单文件上传。字段名avatar  request.file=Express.Multer.File
app.post(
  '/user/uploadAvatar',
  upload.single('avatar'),
  userController.uploadAvatar
)

// 如果没有匹配到任何路由，则会创建一个自定义404错误对象并传递给错误处理中间件
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: HttpException = new HttpException(404, '尚未为此路径分配路由')
  next(error)
})

app.use(errorMiddleware)
;(async function() {
  await mongoose.set('useNewUrlParser', true)
  await mongoose.set('useUnifiedTopology', true)
  const MONGODB_URL =
    process.env.MONGODB_URL || `mongodb://localhost:27017/react-classroom`
  await mongoose.connect(MONGODB_URL)
  const PORT = process.env.PORT || 8001
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
  })
})()

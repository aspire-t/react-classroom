import express, { Express, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose' // 连接数据库的
import cors from 'cors' // 用来跨域的
import morgan from 'morgan' // 这是用来输入访问日志的
import helmet from 'helmet' // 用来进行安全过滤的
import multer from 'multer' // 上传头像
import path from 'path'
import 'dotenv/config' // 这是包的作用是读取.env文件然后写入process.env.JWT_SECRET_KEY

import errorMiddleware from './middlewares/errorMiddleware'
import HttpException from './exceptions/HttpException'
import * as userController from './controllers/userController'
import * as slideController from './controllers/slideController'
import * as lessonController from './controllers/lessonController'
import { Slider, Lesson } from './models'

//指定上传文件的存储空间
const storage = multer.diskStorage({
  //指定上传的目录
  destination: path.join(__dirname, 'public', 'uploads'),
  filename(_req: Request, file: Express.Multer.File, callback) {
    // callback 第一个参数是错误对象,第二个参数是文件名 时间戳.jpg
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

app.get('/slider/list', slideController.list)
app.get('/lesson/list', lessonController.list)

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
  // 初始化数据
  await createInitialSliders()
  await createInitialLessons()

  const PORT = process.env.PORT || 8001
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
  })
})()

async function createInitialSliders() {
  const sliders = await Slider.find()
  if (sliders.length == 0) {
    const sliders = [
      {
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/reactnative.png'
      },
      { url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png' },
      { url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png' },
      { url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/wechat.png' },
      { url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/architect.jpg' }
    ]
    await Slider.create(sliders)
  }
}

async function createInitialLessons() {
  const lessons = await Lesson.find()
  if (lessons.length == 0) {
    const lessons = [
      {
        order: 1,
        title: '1.React全栈架构',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/react/img/react.jpg',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        price: 100.0,
        category: 'react'
      },
      {
        order: 2,
        title: '2.React全栈架构',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/react/img/react.jpg',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        price: 200.0,
        category: 'react'
      },
      {
        order: 3,
        title: '3.React全栈架构',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/react/img/react.jpg',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        price: 300.0,
        category: 'react'
      },
      {
        order: 4,
        title: '4.React全栈架构',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/react/img/react.jpg',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        price: 400.0,
        category: 'react'
      },
      {
        order: 5,
        title: '5.React全栈架构',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/react/img/react.jpg',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        price: 500.0,
        category: 'react'
      },
      {
        order: 6,
        title: '6.Vue从入门到项目实战',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/vue/img/vue.png',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
        price: 100.0,
        category: 'vue'
      },
      {
        order: 7,
        title: '7.Vue从入门到项目实战',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/vue/img/vue.png',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
        price: 200.0,
        category: 'vue'
      },
      {
        order: 8,
        title: '8.Vue从入门到项目实战',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/vue/img/vue.png',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
        price: 300.0,
        category: 'vue'
      },
      {
        order: 9,
        title: '9.Vue从入门到项目实战',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/vue/img/vue.png',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
        price: 400.0,
        category: 'vue'
      },
      {
        order: 10,
        title: '10.Vue从入门到项目实战',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/vue/img/vue.png',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
        price: 500.0,
        category: 'vue'
      },
      {
        order: 11,
        title: '11.React全栈架构',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/react/img/react.jpg',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        price: 600.0,
        category: 'react'
      },
      {
        order: 12,
        title: '12.React全栈架构',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/react/img/react.jpg',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        price: 700.0,
        category: 'react'
      },
      {
        order: 13,
        title: '13.React全栈架构',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/react/img/react.jpg',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        price: 800.0,
        category: 'react'
      },
      {
        order: 14,
        title: '14.React全栈架构',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/react/img/react.jpg',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        price: 900.0,
        category: 'react'
      },
      {
        order: 15,
        title: '15.React全栈架构',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/react/img/react.jpg',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        price: 1000.0,
        category: 'react'
      },
      {
        order: 16,
        title: '16.Vue从入门到项目实战',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/vue/img/vue.png',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
        price: 600.0,
        category: 'vue'
      },
      {
        order: 17,
        title: '17.Vue从入门到项目实战',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/vue/img/vue.png',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
        price: 700.0,
        category: 'vue'
      },
      {
        order: 18,
        title: '18.Vue从入门到项目实战',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/vue/img/vue.png',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
        price: 800.0,
        category: 'vue'
      },
      {
        order: 19,
        title: '19.Vue从入门到项目实战',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/vue/img/vue.png',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
        price: 900.0,
        category: 'vue'
      },
      {
        order: 20,
        title: '20.Vue从入门到项目实战',
        video: 'http://img.zhufengpeixun.cn/gee2.mp4',
        poster: 'http://www.zhufengpeixun.cn/vue/img/vue.png',
        url: 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png',
        price: 1000.0,
        category: 'vue'
      }
    ]
    await Lesson.create(lessons)
  }
}

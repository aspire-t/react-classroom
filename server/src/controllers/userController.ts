import { Request, Response, NextFunction } from 'express'
import { UNPROCESSABLE_ENTITY, UNAUTHORIZED } from 'http-status-codes' // http的状态码
import jwt from 'jsonwebtoken'

import { User } from '../models'
import { validateRegisterInput } from '../utils/validator'
import HttpException from '../exceptions/HttpException'
import { UserDocument } from '../models/user'
import { UserPayload } from '../typings/payload'

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { username, password, confirmPassword, email } = req.body
  let { valid, errors } = validateRegisterInput(
    username,
    password,
    confirmPassword,
    email
  )

  try {
    if (!valid) {
      throw new HttpException(
        UNPROCESSABLE_ENTITY,
        '用户提交的参数不正确',
        errors
      )
    }

    let oldUser: UserDocument | null = await User.findOne({ username })
    if (oldUser) {
      throw new HttpException(UNPROCESSABLE_ENTITY, '用户名重复', errors)
    }

    let user: UserDocument = new User({
      username,
      password,
      confirmPassword,
      email
    })
    await user.save()
    res.json({
      success: true,
      data: user.toJSON()
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { username, password } = req.body
    // 在 User上扩展了login方法，比直接在这里写判断的逻辑更方便校验，代码也更清晰
    // let user = await User.findOne({ username })
    let user: UserDocument | null = await User.login(username, password)

    if (user) {
      // 这里是给模型的实例扩展方法
      let access_token = user.getAccessToken()
      res.json({
        success: true,
        data: access_token
      })
    } else {
      throw new HttpException(UNAUTHORIZED, '登录失败')
    }
  } catch (error) {
    next(error)
  }
}

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const access_token = authorization.split(' ')[1] // [0] 第一项是Bearer 第二项是access_token
    if (access_token) {
      try {
        const userPayload: UserPayload = jwt.verify(
          access_token,
          process.env.JWT_SECRET_KEY || 'zhangsan'
        ) as UserPayload

        const user: UserDocument | null = await User.findById(userPayload.id)

        if (user) {
          res.json({
            success: true,
            data: user.toJSON()
          })
        } else {
          next(new HttpException(UNAUTHORIZED, '用户未找到'))
        }
      } catch (error) {
        next(new HttpException(UNAUTHORIZED, 'access_token 不正确'))
      }
    } else {
      next(new HttpException(UNAUTHORIZED, 'access_token 未提供'))
    }
  } else {
    next(new HttpException(UNAUTHORIZED, 'authorization 未提供'))
  }
}

export const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { userId } = req.body
    console.log(userId)
    console.log(req.file)
    // console.log(req)
    let avatar =
      'https://gw.alipayobjects.com/zos/rmsportal/DkKNubTaaVsKURhcVGkh.svg'
    // let avatar = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`
    // console.log(userId)
    // await User.updateOne({ _id: userId }, { avatar })
    // //处理上传的文件，然后更新数据库，更新此用户对应的avatar字段。然后返回真实的图片路径

    res.json({
      success: true,
      data: avatar
    })
  } catch (error) {
    next(error)
  }
}
// http://localhost:8001/user/uploadAvatar

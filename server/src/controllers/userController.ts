import { Request, Response, NextFunction } from 'express'
import { UNPROCESSABLE_ENTITY } from 'http-status-codes' // http的状态码

import { User } from '../models'
import { validateRegisterInput } from '../utils/validator'
import HttpException from '../exceptions/HttpException'
import { UserDocument } from '../models/user'

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
      data: user
    })
  } catch (error) {
    next(error)
  }
}

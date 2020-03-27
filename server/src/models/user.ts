import mongoose, { Schema, Model, Document, HookNextFunction } from 'mongoose'
import bcryptjs from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { UserPayload } from '../typings/payload'

import 'dotenv/config'
export interface UserDocument extends Document {
  username: string
  password: string
  avatar: string
  email: string
  getAccessToken: () => string
  _doc: UserDocument
}

// UserSchema 是一个文档类型
// const UserSchema: mongoose.Schema<any>
const UserSchema: Schema<UserDocument> = new Schema(
  {
    username: {
      type: String,
      required: [true, '用户名不能为空'],
      minlength: [6, '最小长度不能小于6位'],
      maxlength: [12, '最大长度不得大于12位']
    },
    password: String,
    avatar: String,
    email: {
      type: String,
      validate: {
        //自定义较验器
        validator: validator.isEmail
      },
      trim: true //   email='  xx@qq.com ' 存的时候是否要去空格
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(_doc: any, result: any) {
        result.id = result._id
        delete result._id
        delete result.__v
        delete result.password
        delete result.createdAt
        delete result.updatedAt
        return result
      }
    }
  } // 使用时间戳 会自动添加两个字段  createdAt updatedAt
)

UserSchema.pre<UserDocument>('save', async function(next: HookNextFunction) {
  // 判断password是否更新
  if (!this.isModified('password')) {
    return next()
  }

  try {
    this.password = await bcryptjs.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

// 在user的 schema 上扩展login方法
// 注意这里不能使用箭头函数,因为需要去拿到this
UserSchema.static('login', async function(
  this: any,
  username: string,
  password: string
): Promise<UserDocument | null> {
  let user: UserDocument | null = await this.model('User').findOne({ username })
  if (user) {
    // 比较用户输入的password 和数据库中存入的password是否一样
    // 只能用库去实现,不能自己判断是否相等
    const matched = await bcryptjs.compare(password, user.password)
    if (matched) {
      return user
    } else {
      return null
    }
  } else {
    return null
  }
})

// interface Person {
//   name: string
// }
// // 指定函数中this的类型
// function my(this: Person) {
//   console.log(this)
// }

// let p: Person = { name: 'zhangsan' }
// my.apply(p)

// 在user的模型的实例上扩展getAccessToken方法
UserSchema.methods.getAccessToken = function(this: UserDocument): string {
  // this.id 和 this._id 是一样的 this.id是 this._id 的语法糖
  let payload: UserPayload = { id: this.id }
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'jwt_token', {
    expiresIn: '1h'
  })
}

// 在user的模型上扩展login方法
interface UserModel<T extends Document> extends Model<T> {
  login: (username: string, password: string) => UserDocument | null
}

// 这里User 的类型，是UserModel 而不是以前的Model了
// const User: mongoose.Model<mongoose.Document, {}>
export const User: UserModel<UserDocument> = mongoose.model<
  UserDocument,
  UserModel<UserDocument>
>('User', UserSchema)

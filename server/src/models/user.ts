import mongoose, { Schema, Model, Document, HookNextFunction } from 'mongoose'
import bcryptjs from 'bcryptjs'
import validator from 'validator'
// import jwt from 'jsonwebtoken'
export interface UserDocument extends Document {
  username: string
  password: string
  avatar: string
  email: string
  // getAccessToken: () => string
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
  { timestamps: true } // 使用时间戳 会自动添加两个字段  createdAt updatedAt
)

// const User: mongoose.Model<mongoose.Document, {}>
export const User: Model<UserDocument> = mongoose.model<UserDocument>(
  'User',
  UserSchema
)

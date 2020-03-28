import mongoose, { Schema, Document, Model } from 'mongoose'
export interface LessonDocument extends Document {
  order: number
  title: string //标题
  video: string //视频地址
  poster: string //海报地址
  url: string //url地址
  price: number //价格
  category: string //分类
}
const LessonSchema: Schema<LessonDocument> = new Schema(
  {
    order: Number,
    title: String, //标题
    video: String, //视频地址
    poster: String, //海报地址
    url: String, //url地址
    price: Number, //价格
    category: String //分类
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(_doc: LessonDocument, result: LessonDocument) {
        result.id = result._id
        delete result._id
        delete result.__v
        return result
      }
    }
  }
)

export const Lesson: Model<LessonDocument> = mongoose.model(
  'Lesson',
  LessonSchema
)

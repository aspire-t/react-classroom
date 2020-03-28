import mongoose, { Schema, Model, Document } from 'mongoose'

export interface SliderDocument extends Document {
  url: string
}

const SliderSchema: Schema<SliderDocument> = new Schema(
  {
    url: String
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(_doc: any, result: any) {
        result.id = result._id
        delete result._id
        delete result.__v
        delete result.createdAt
        delete result.updatedAt
        return result
      }
    }
  }
)

export const Slider: Model<SliderDocument> = mongoose.model(
  'Slider',
  SliderSchema
)

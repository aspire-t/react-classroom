import { Request, Response } from 'express'
import { Lesson, LessonDocument } from '../models'

export const list = async (_req: Request, res: Response) => {
  let lessons: LessonDocument[] = await Lesson.find()
  res.json({ success: true, data: lessons })
}

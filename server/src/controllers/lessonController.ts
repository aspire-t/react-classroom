import { Request, Response } from 'express'
import { Lesson, LessonDocument } from '../models'

export const list = async (req: Request, res: Response) => {
  let { category = 'all', offset, limit } = req.query
  offset = isNaN(offset) ? 0 : Number(offset)
  limit = isNaN(limit) ? 5 : Number(limit)
  let query: Partial<LessonDocument> = {}
  if (category && category !== 'all') {
    query.category = category
  }
  let total: number = await Lesson.count(query) // 符合条件的总条数
  let list: LessonDocument[] = await Lesson.find(query)
    .sort({ order: 1 })
    .skip(offset)
    .limit(limit)

  // 20>0+5 true   20>5+5   20> 10+5   20>15+5
  res.json({ success: true, data: { list, hasMore: total > offset + limit } })
}

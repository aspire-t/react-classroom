import request from './index'
import { SliderData, LessonData } from '../typings'

export function getSliders() {
  return request.get<SliderData, SliderData>('/slider/list')
}
/**
 * @param category 要获取哪个分类下面的课程列表 all是全部 react vue
 * @param offset 从哪个索引开始获取
 * @param limit  限定要返回的条目数
 */
export function getLessons<T>(
  currentCategory: string = 'all',
  offset: number,
  limit: number
) {
  return request.get<T, T>(
    `/lesson/list?category=${currentCategory}&offset=${offset}&limit=${limit}`
  )
}

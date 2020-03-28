import request from './index'
import { SliderData } from '../typings'

export function getSliders() {
  return request.get<SliderData, SliderData>('/slider/list')
}

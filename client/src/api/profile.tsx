import request from './index'
import { RegisterPayload } from '@/typings/profile'
import { AxiosResponse } from 'axios'

export function validate() {
  return request.get('/user/validate')
}

// export function register<T>(values: RegisterPayload) {
//   return request.post<T, AxiosResponse<T>>('/user/register', values)
// }

export function register<T>(values: RegisterPayload) {
  return request.post<T, T>('/user/register', values)
}

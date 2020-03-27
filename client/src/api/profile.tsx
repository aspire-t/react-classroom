import request from './index'
import { RegisterPayload, LoginPayload } from '@/typings/profile'
import { AxiosResponse } from 'axios'

export function validate() {
  return request.get('/user/validate')
}

// T 其实就代表真正的返回的数据
// export function register<T>(values: RegisterPayload) {
//   return request.post<T, AxiosResponse<T>>('/user/register', values)
// }

export function register<T>(values: RegisterPayload) {
  return request.post<T, T>('/user/register', values)
}

export function login<T>(values: LoginPayload) {
  return request.post<T, T>('/user/login', values)
}

import request from './index'

export function validate() {
  return request.get('/user/validate')
}

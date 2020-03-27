import { push } from 'connected-react-router'
import * as actionTypes from '@/store/action-types'
import { validate, register } from '@/api/profile'
import { RegisterPayload, LoginPayload } from '@/typings/profile'
import { message } from 'antd'
import { RegisterData } from '@/typings/response'
import { AxiosResponse } from 'axios'
export default {
  validate() {
    return {
      type: actionTypes.VALIDATE,
      payload: validate()
    }
  },
  logout() {
    return function(dispatch: any, getState: any) {
      sessionStorage.removeItem('access_token')
      dispatch(push('/login'))
    }
  },
  register(values: RegisterPayload) {
    return function(dispatch: any, getState: any) {
      // 这里套了一层 async 就是为了 能await
      ;(async function() {
        try {
          // AxiosResponse data 才是响应体
          // let result: AxiosResponse<RegisterData> = await register<
          //   RegisterData
          // >(values)

          let result: RegisterData = await register<RegisterData>(values)

          if (result.success) {
            dispatch(push('/login'))
          } else {
            message.error('注册失败')
          }
        } catch (error) {
          message.error('注册失败')
        }
      })()
    }
  },
  login(values: LoginPayload) {}
}

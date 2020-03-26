import * as actionTypes from '@/store/action-types'
import { validate } from '@/api/profile'
import { push } from 'connected-react-router'

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
  }
}

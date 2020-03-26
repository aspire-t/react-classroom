import { AnyAction } from 'redux'
import { ProfileState, LOGIN_TYPES } from '@/typings/state'
import * as actionTypes from '@/store/action-types'

// ProfileState 的初始值
const initialState: ProfileState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null
}

export default function(
  state: ProfileState = initialState,
  action: AnyAction
): ProfileState {
  switch (action.type) {
    case actionTypes.VALIDATE:
      if (action.payload.success) {
        return {
          loginState: LOGIN_TYPES.LOGIN,
          user: action.payload,
          error: null
        }
      } else {
        return {
          loginState: LOGIN_TYPES.UN_LOGIN,
          user: null,
          error: action.payload
        }
      }
    case actionTypes.LOGOUT:
      return {
        loginState: LOGIN_TYPES.UN_LOGIN,
        user: null,
        error: null
      }
    default:
      break
  }

  return state
}

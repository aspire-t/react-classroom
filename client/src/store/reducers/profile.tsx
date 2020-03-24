import { AnyAction } from 'redux'
import { ProfileState, LOGIN_TYPES } from '@/typings/state'

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
  return state
}

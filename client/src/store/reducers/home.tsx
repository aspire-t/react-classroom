import { AnyAction } from 'redux'
import { HomeState } from '@/typings/state'
import * as actionTypes from '@/store/action-types'

const initialState: HomeState = {
  currentCategory: 'all'
}

export default function(
  state: HomeState = initialState,
  action: AnyAction
): HomeState {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload }
    default:
      return state
  }
}

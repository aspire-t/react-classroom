import { AnyAction } from 'redux'
import { HomeState } from '@/typings'
import * as actionTypes from '@/store/action-types'

const initialState: HomeState = {
  currentCategory: 'all',
  sliders: [],
  lessons: {
    loading: false,
    list: [],
    hasMore: true,
    offset: 0,
    limit: 5
  }
}

//immer 不可变数据集  redux-immutable  redux-immer
export default function(
  state: HomeState = initialState,
  action: AnyAction
): HomeState {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload }
    case actionTypes.GET_SLIDERS:
      //  dispatch({ ...action, payload: error, error: true });
      // action有了error属性，那说明promise失败了
      if (action.error) {
        return state
      } else {
        return { ...state, sliders: action.payload.data }
      }

    case actionTypes.SET_LESSON:
      return {
        ...state,
        lessons: {
          ...state.lessons,
          loading: false,
          list: [...state.lessons.list, ...action.payload.list],
          hasMore: action.payload.hasMore,
          offset: state.lessons.offset + action.payload.list.length
        }
      }
    default:
      return state
  }
}

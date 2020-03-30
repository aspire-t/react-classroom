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
    case actionTypes.SET_LESSONS_LOADING:
      // redux规定reducer永远要返回一个新的状态
      // 用immer来解决这个问题
      state.lessons.loading = action.payload
      return state
    case actionTypes.SET_LESSONS:
      state.lessons.loading = false
      state.lessons.list = [...state.lessons.list, ...action.payload.list]
      state.lessons.hasMore = action.payload.hasMore
      state.lessons.offset = state.lessons.offset + action.payload.list.length
      return state
    // case actionTypes.SET_LESSONS:
    //   return {
    //     ...state,
    //     lessons: {
    //       ...state.lessons,
    //       loading: false,
    //       list: [...state.lessons.list, ...action.payload.list],
    //       hasMore: action.payload.hasMore,
    //       offset: state.lessons.offset + action.payload.list.length
    //     }
    //   }
    default:
      return state
  }
}

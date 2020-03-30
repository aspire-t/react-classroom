import * as actionTypes from '@/store/action-types'
import { getSliders, getLessons } from '@/api/home'
import { StoreDispatch, StoreGatState } from '../index'
import { LessonData } from '@/typings'

export default {
  setCurrentCategory(currentCategory: string) {
    return {
      type: actionTypes.SET_CURRENT_CATEGORY,
      payload: currentCategory
    }
  },
  getSliders() {
    // getSliders()会返回一个promise 你向仓库里派发一个这样action.action.payload是一个promise
    // redux-promise中间件会等待promise完成。完成这后会再次向仓库派发action dispatch({type:GET_SLIDERS,payload:SliderData})
    return {
      type: actionTypes.GET_SLIDERS,
      payload: getSliders()
    }
  },
  // 获取课程列表数据 获取下一页数据并合并到当前列表中
  getLessons() {
    return function(dispatch: StoreDispatch, getState: StoreGatState) {
      ;(async function() {
        let {
          currentCategory,
          lessons: { hasMore, offset, limit, loading }
        } = getState().home

        if (!loading && hasMore) {
          // 先把loading设置为true
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true })
          // 调接口加载数据
          let result: LessonData = await getLessons<LessonData>(
            currentCategory,
            offset,
            limit
          )

          dispatch({
            type: actionTypes.SET_LESSONS,
            payload: result.data
          })
        }
      })()
    }
  },
  refreshLessons() {
    return function(dispatch: StoreDispatch, getState: StoreGatState) {
      ;(async function() {
        let {
          currentCategory,
          lessons: { limit, loading }
        } = getState().home

        if (!loading) {
          // 先把loading设置为true
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true })
          // 调接口加载数据
          let result: LessonData = await getLessons<LessonData>(
            currentCategory,
            0,
            limit
          )

          dispatch({
            type: actionTypes.REFRESH_LESSONS,
            payload: result.data
          })
        }
      })()
    }
  }
}

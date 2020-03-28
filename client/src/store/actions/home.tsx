import * as actionTypes from '@/store/action-types'
import { getSliders } from '@/api/home'

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
  }
}

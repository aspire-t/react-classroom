import { AnyAction } from 'redux'
import { CartState, CartItem } from '@/typings/cart'
import * as actionTypes from '@/store/action-types'

let initialState: CartState = []

export default function(
  state: CartState = initialState,
  action: AnyAction
): CartState {
  switch (action.type) {
    //向购物车里添加一个条目，如果已经有这个商品了，数量加1，如果没有则加一个条目
    case actionTypes.ADD_CART_ITEM: //{type:ADD_CART_ITEM,payload:lesson}
      let oldLesson = state.find(item => item.lesson.id === action.payload.id)
      if (oldLesson) {
        oldLesson.count += 1
      } else {
        state.push({ count: 1, checked: false, lesson: action.payload })
      }
      return state
    // 删除条目
    case actionTypes.REMOVE_CART_ITEM: //{type:REMOVE_CART_ITEM,payload:id}
      let removeIndex = state.findIndex(
        item => item.lesson.id === action.payload
      )
      if (removeIndex != -1) {
        state.splice(removeIndex, 1)
      }
      return state
    //清空购物车
    case actionTypes.CLEAR_CART_ITEM:
      state.length = 0
      return state
    // 改变数量
    case actionTypes.CHANGE_CART_ITEM_COUNT: //{type:CHANGE_CART_ITEM_COUNT,payload:{id,count}}
      let changeIndex = state.findIndex(
        item => item.lesson.id === action.payload.id
      )
      if (changeIndex != -1) {
        state[changeIndex].count = action.payload.count
      }
      return state
    // 改变是否选中条目
    case actionTypes.CHANGE_CHECKED_CART_ITEMS: //{type:CHANGE_CHECKED_CART_ITEMS,payload:[1,2,3]}
      let checkedIds = action.payload
      return state.map((item: CartItem) => {
        if (checkedIds.includes(item.lesson.id)) {
          item.checked = true
        } else {
          item.checked = false
        }
        return item
      })
    // 结算
    case actionTypes.SETTLE:
      return state.filter((item: CartItem) => !item.checked)

    default:
      return state
  }
}

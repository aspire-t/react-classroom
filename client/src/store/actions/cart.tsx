import { Lesson } from '@/typings'
import * as actionTypes from '@/store/action-types'
import { StoreDispatch } from '../index'
import { message } from 'antd'

export default {
  addCartItem(lesson: Lesson) {
    return function(dispatch: StoreDispatch) {
      dispatch({
        type: actionTypes.ADD_CART_ITEM,
        payload: lesson
      })
      message.info('添加购物车成功')
    }
    // return {
    //   type: actionTypes.ADD_CART_ITEM,
    //   payload: lesson
    // }
  },
  changeCartItemCount(id: string, count: number) {
    return {
      type: actionTypes.CHANGE_CART_ITEM_COUNT,
      payload: { id, count }
    }
  },
  removeCartItem(id: string) {
    return {
      type: actionTypes.REMOVE_CART_ITEM,
      payload: id
    }
  },
  changeCheckedCartItems(checkIds: string[]) {
    return {
      type: actionTypes.CHANGE_CHECKED_CART_ITEMS,
      payload: checkIds
    }
  },
  clearCartItems() {
    return {
      type: actionTypes.CLEAR_CART_ITEM
    }
  },
  settle() {
    return {
      type: actionTypes.SETTLE
    }
  }
}

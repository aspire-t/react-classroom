export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'
export const VALIDATE = 'VALIDATE'
export const LOGOUT = 'LOGOUT'
export const SET_AVATAR = 'SET_AVATAR'
export const GET_SLIDERS = 'GET_SLIDERS'

export const GET_LESSONS = 'GET_LESSONS' // 派发一个函数，函数里要调用接口返回数据
export const SET_LESSONS = 'SET_LESSONS' //设置课程列表的数据到仓库中去
export const SET_LESSONS_LOADING = 'SET_LESSONS_LOADING' //把课程分状态的loading设置为给定的值
export const REFRESH_LESSONS = 'REFRESH_LESSONS' //下拉刷新的功能

export const ADD_CART_ITEM = 'ADD_CART_ITEM' //向购物车里添加一个商品
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM' //从购物车里删除一个商品
export const CLEAR_CART_ITEM = 'CLEAR_CART_ITEM' //清空购物车商品
export const CHANGE_CART_ITEM_COUNT = 'CHANGE_CART_ITEM_COUNT' //修改购物车里某件商品的数量
export const CHANGE_CHECKED_CART_ITEMS = 'CHANGE_CHECKED_CART_ITEMS' //修改哪些商品被选中
export const SETTLE = 'SETTLE' //结算的时候，会把选中的商品添加到订单里去，从购物车中删除

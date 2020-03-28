import { createStore, applyMiddleware, Dispatch } from 'redux'
import promise from 'redux-promise'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import history from '@/history'
import rootReducer from './reducers'
import { CombinedState } from '@/typings'
// redux-promise 和 redux-thunk 都是中间件
// redux-promise 可以让我们派发promise，redux-thunk 让我们可以派发函数

// 关于如何创建store 一般是有两种方式
// createStore 和 applyMiddleWare 两种方式
let store = applyMiddleware(
  routerMiddleware(history),
  promise,
  thunk,
  logger
)(createStore)(rootReducer)

export type StoreDispatch = Dispatch
export type StoreGatState = () => CombinedState

export default store

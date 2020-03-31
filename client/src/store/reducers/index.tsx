import { ReducersMapObject, AnyAction, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'
import home from './home'
import mine from './mine'
import profile from './profile'
import cart from './cart'
import history from '@/history'
import { CombinedState } from '@/typings/state'
import produce from 'immer'
// combineReducers 是从redux里面引出来的，现在是从redux-immer里面引出来
import { combineReducers } from 'redux-immer'

// 第一步：我们先自己构建RootState 根状态
// export interface CombinedState {
//   home: HomeState
//   mine: MineState
//   profile: ProfileState
//   router: RouterState<any>
// }
// 第二步：创建reducer
// [K in keyof S]: Reducer<S[K], A>
let reducers: ReducersMapObject<CombinedState, AnyAction> = {
  home,
  mine,
  profile,
  cart,
  router: connectRouter(history)
}

const rootReducer: Reducer<CombinedState, AnyAction> = combineReducers<
  CombinedState
>(produce, reducers)

export default rootReducer

// export type RootState = {
//   // 迭代reducers所有逇key reducers[key] 是reducer类型，ReturnType返回此函数类型的返回值类型
//   [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
// }
// RootState 最后返回的样子和 RootState2 类似
// type RootState2 = {
//   home: HomeState,
//   mine: MineState,
//   profile: ProfileState,
//   router:RouterState<any>
// }

// export function combineReducers<S>(
//   reducers: ReducersMapObject<S, any>
// ): Reducer<CombinedState<S>>
// export type ReducersMapObject<S = any, A extends Action = Action> = {
//   [K in keyof S]: Reducer<S[K], A>
// }

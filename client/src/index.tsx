import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { connectRouter, ConnectedRouter } from 'connected-react-router'

import store from './store'
import Home from './routes/Home'
import Mine from './routes/Mine'
import Register from './routes/Register'
import Login from './routes/Login'
import Profile from './routes/Profile'
import Detail from './routes/Detail'
import Cart from './routes/Cart'
import history from '@/history'
import Tabs from '@/components/Tabs'

import './assets/style/common.less'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zh_CN}>
        <main className="main-container">
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/mine" exact component={Mine}></Route>
            <Route path="/profile" exact component={Profile}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/detail/:id" exact component={Detail}></Route>
            <Route path="/cart" exact component={Cart}></Route>
          </Switch>
        </main>
        <Tabs />
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

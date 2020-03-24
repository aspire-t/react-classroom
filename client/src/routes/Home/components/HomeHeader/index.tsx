import React, { useState } from 'react'
import { Icon } from 'antd'
import classnames from 'classnames'
import './index.less'
// 如果是用require加载的话，返回值的default属性才是那个图片的地址
const logo = require('../../../../assets/images/logo.png')

export interface Props {
  currentCategory: string // 当前选中的分类 此数据会放在redux仓库中
  setCurrentCategory: (currentCategory: string) => any // 改变仓库中的分类
}

function HomeHeader(props: Props) {
  let [isMenuVisible, setIsMenuVisible] = useState(false)
  const setCurrentCategory = () => {}
  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={logo.default}></img>
        <Icon
          type="bars"
          onClick={_ => setIsMenuVisible(!isMenuVisible)}
        ></Icon>
      </div>
      {isMenuVisible && (
        <ul className="category">
          <li
            data-category="all"
            className={classnames({ active: props.currentCategory === 'all' })}
          >
            全部课程
          </li>
          <li
            data-category="react"
            className={classnames({
              active: props.currentCategory === 'react'
            })}
          >
            react课程
          </li>
          <li
            data-category="vue"
            className={classnames({ active: props.currentCategory === 'vue' })}
          >
            vue课程
          </li>
        </ul>
      )}
    </header>
  )
}

export default HomeHeader

/**
 * 因为此组件是由路由渲染出来的
 * 所以属性对象会包括路由属性
 * 另外此组件需要连接仓库
 */

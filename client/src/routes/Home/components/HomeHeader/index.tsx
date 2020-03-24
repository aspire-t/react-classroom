import React, { useState, CSSProperties } from 'react'
import { Icon } from 'antd'
import classnames from 'classnames'
import { Transition } from 'react-transition-group'

import './index.less'

// 如果是用require加载的话，返回值的default属性才是那个图片的地址
// 如果要用import 该如何解决？
// 因为ts 不认识图片 只认识 js jsx tsx
// 新建一个 images.d.ts 文件就可以了
import logo from '@/assets/images/logo.png'
// const logo = require('../../../../assets/images/logo.png')

export interface Props {
  currentCategory: string // 当前选中的分类 此数据会放在redux仓库中
  setCurrentCategory: (currentCategory: string) => any // 改变仓库中的分类
}

const duration = 500

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}
interface TransitionStyles {
  entering: CSSProperties
  entered: CSSProperties
  exiting: CSSProperties
  exited: CSSProperties
}

const transitionStyles: TransitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

function HomeHeader(props: Props) {
  let [isMenuVisible, setIsMenuVisible] = useState(false)

  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    let target: HTMLUListElement = event.target as HTMLUListElement
    let category = target.dataset.category
    props.setCurrentCategory(category)
    setIsMenuVisible(false)
  }

  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={logo.default}></img>
        <Icon
          type="bars"
          onClick={_ => setIsMenuVisible(!isMenuVisible)}
        ></Icon>
      </div>
      <Transition in={isMenuVisible} timeout={duration}>
        {(state: keyof TransitionStyles) => (
          <ul
            className="category"
            onClick={setCurrentCategory}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <li
              data-category="all"
              className={classnames({
                active: props.currentCategory === 'all'
              })}
            >
              全部课程
            </li>
            <li
              data-category="react"
              className={classnames({
                active: props.currentCategory === 'react'
              })}
            >
              React课程
            </li>
            <li
              data-category="vue"
              className={classnames({
                active: props.currentCategory === 'vue'
              })}
            >
              Vue课程
            </li>
          </ul>
        )}
      </Transition>
    </header>
  )
}

export default HomeHeader

/**
 * 因为此组件是由路由渲染出来的
 * 所以属性对象会包括路由属性
 * 另外此组件需要连接仓库
 */

import React, {
  useState,
  useEffect,
  PropsWithChildren,
  useCallback
} from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { StaticContext } from 'react-router'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'

import Nav from '@/components/Nav'
import { CombinedState, GetLessonData, Lesson } from '@/typings'
import { getLessonById } from '@/api/home'
import actions from '@/store/actions/cart'

import './index.less'

interface Params {
  id: string
}

// interface RouteComponentProps<
//     Params extends { [K in keyof Params]?: string } = {},
//     C extends StaticContext = StaticContext,
//     S = H.LocationState
// >
type Props = PropsWithChildren<
  RouteComponentProps<Params, StaticContext, Lesson> & typeof actions
>

function Detail(props: Props) {
  // let [lesson, setLesson] = useState<Lesson>(props.location.state)
  let [lesson, setLesson] = useState<Lesson>({} as Lesson)

  useEffect(() => {
    ;(async function() {
      let lesson = props.location.state
      //如果是从课程列表页跳过来的，是有state,如果是刷新的，就没有state
      if (!lesson) {
        //如果没有传lesson过来的话，需要接口调取课程详情,参数就是课程ID
        let result: GetLessonData = await getLessonById<GetLessonData>(
          props.match.params.id
        )
        if (result.success) {
          lesson = result.data
        }
      }
      setLesson(lesson)
    })()
  }, [])

  const addCartItem = useCallback((lesson: Lesson) => {
    // 购物车动画
    // 思路：复制div，对其做动画
    // 利用 getBoundingClientRect 获取它的left，top，right，bottom的值
    let cover: HTMLDivElement = document.querySelector('.ant-card-cover') // cart 的DOM
    let coverWidth = cover.offsetWidth // cart宽度
    let coverHeight = cover.offsetHeight // cart高度
    let coverLeft = cover.getBoundingClientRect().left //距离左边的距离
    let coverTop = cover.getBoundingClientRect().top // 顶部距离

    let cart: HTMLAreaElement = document.querySelector(
      'a .anticon.anticon-shopping-cart'
    ) // 底部购物车DOM
    let cartWidth = cart.offsetWidth //购物车图标宽度
    let cartHeight = cart.offsetHeight //购物车图标高度
    let cartRight = cart.getBoundingClientRect().right //右边框  距离左边的距离
    let cartBottom = cart.getBoundingClientRect().bottom // 底部 距离顶部距离
    // clone 出来的div
    let clonedCover: HTMLDivElement = cover.cloneNode(true) as HTMLDivElement

    clonedCover.style.cssText = `
        z-index:1000;
        opacity:.8;
        position:fixed;
        width:${coverWidth}px;
        height:${coverHeight}px;
        top:${coverTop}px;
        left:${coverLeft}px;
        transition: all 1s ease-in-out;
      `
    document.body.appendChild(clonedCover)

    setTimeout(() => {
      clonedCover.style.left = `${cartRight - cartWidth / 2}px`
      clonedCover.style.top = `${cartBottom - cartHeight / 2}px`
      clonedCover.style.width = '0px'
      clonedCover.style.height = '0px'
      clonedCover.style.opacity = '.5'
    }, 0)

    setTimeout(() => {
      clonedCover.parentNode.removeChild(clonedCover)
    }, 1000)

    props.addCartItem(lesson)
  }, [])

  return (
    <>
      <Nav history={props.history}>课程详情</Nav>
      <Card
        hoverable
        style={{ width: '100%' }}
        cover={<img src={lesson.poster} />}
      >
        <Card.Meta
          title={lesson.title}
          description={
            <>
              <p>{`价格:¥${lesson.price}元`}</p>
              <p>
                <Button
                  className="add-cart"
                  icon="shopping-cart"
                  onClick={() => addCartItem(lesson)}
                >
                  加入购物车
                </Button>
              </p>
            </>
          }
        />
      </Card>
    </>
  )
}

export default connect(
  (state: CombinedState): CombinedState => state,
  actions
)(Detail)

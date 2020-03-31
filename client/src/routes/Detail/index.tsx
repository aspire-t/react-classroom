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

  const addCartItem = (lesson: Lesson) => {
    props.addCartItem(lesson)
  }

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

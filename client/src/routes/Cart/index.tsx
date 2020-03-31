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

import './index.less'

interface Params {
  id: string
}

type Props = PropsWithChildren<RouteComponentProps<Params>>

function Cart(props: Props) {
  let [lesson, setLesson] = useState<Lesson>({} as Lesson)

  return (
    <>
      <Nav history={props.history}>购物车</Nav>
    </>
  )
}

export default connect((state: CombinedState): CombinedState => state)(Cart)

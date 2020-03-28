import React, {
  PropsWithChildren,
  useEffect,
  forwardRef,
  useState
} from 'react'

// import { Lessons, Lesson } from '@/typings'
import { Icon, Card, Button, Alert, Skeleton } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'

type Props = PropsWithChildren<{
  getLessons: () => void
}>

function LessonList(props: Props) {
  useEffect(() => {
    props.getLessons()
  }, [])

  return <div>LessonList</div>
}
export default LessonList

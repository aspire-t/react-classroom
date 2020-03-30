import React, {
  PropsWithChildren,
  useEffect,
  forwardRef,
  useState
} from 'react'

import { Lessons, Lesson } from '@/typings'
import { Icon, Card, Button, Alert, Skeleton } from 'antd'
import { Link } from 'react-router-dom'

import './index.less'

type Props = PropsWithChildren<{
  lessons: Lessons
  getLessons: () => void
}>

function LessonList(props: Props) {
  useEffect(() => {
    props.getLessons()
  }, [])

  return (
    <section className="lesson-list">
      <h2>
        <Icon type="menu" />
        全部课程
      </h2>

      {props.lessons.list.map((item: Lesson, index: number) => (
        <Link
          key={item.id}
          to={{ pathname: `/detail/${item.id}`, state: item }}
        >
          <Card
            hoverable={true}
            style={{ width: '100%' }}
            cover={<img src={item.poster} />}
          >
            <Card.Meta
              title={item.title}
              description={`价格:¥${item.price}元`}
            />
          </Card>
        </Link>
      ))}

      {props.lessons.hasMore ? (
        <Button
          onClick={props.getLessons}
          loading={props.lessons.loading}
          type="primary"
          block
        >
          {props.lessons.loading ? '' : '加载更多'}
        </Button>
      ) : (
        <Alert
          style={{ textAlign: 'center' }}
          message="已加载全部数据"
          type="warning"
        />
      )}
    </section>
  )
}
export default LessonList

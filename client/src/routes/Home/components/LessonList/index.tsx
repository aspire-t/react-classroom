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
  container: any
}>

function LessonList(props: Props, forwardRef: any) {
  // 如果我们想让一个组件强行刷新,需要使用 useState
  // 这个forceUpdate是模拟类组件的强制刷新方法
  const [_, forceUpdate] = useState(0)
  useEffect(() => {
    if (props.lessons.list.length === 0) {
      props.getLessons()
    }
    // forceUpdate(x => x + 1) 这里可以随便写，只是为了刷新
    forwardRef.current = () => forceUpdate(x => x + 1)
  }, [])

  let start = 0 //开始真正渲染的起始索引 从它开始向下渲染3条数据。除此以外的卡片都用空的DIV撑开发
  let rootFontSize = parseFloat(document.documentElement.style.fontSize) //37.5px
  //说明div已经 homeContainer 已经有了
  if (props.container.current) {
    let scrollTop = props.container.current.scrollTop // 获取父容器向上卷去的高度
    //轮播图的高度+h2全部课程的高度
    //37.5*4.2=157.5px  160px+50px;
    start = Math.floor(
      // 4.2 轮播图的高度，1.33是H2的高度  8.66667 是 一张 cart 的高度
      (scrollTop - (4.26 + 1.33) * rootFontSize) / (8.66667 * rootFontSize)
    )
  }

  return (
    <section className="lesson-list">
      <h2>
        <Icon type="menu" />
        全部课程
      </h2>
      <Skeleton
        loading={props.lessons.loading && props.lessons.list.length === 0}
        active
        paragraph={{ rows: 8 }}
      >
        {/* 这种优化方式称为单卡片渲染 */}
        {/* {props.lessons.list.map((item: Lesson, index: number) =>
          index >= start && index <= start + 3 ? (
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
          ) : (
            <div
              key={item.id}
              style={{
                height: `${8.66667 * rootFontSize}px`
              }}
            ></div>
          )
        )} */}

        {/* 这是另外一种渲染方法，可以上下只渲染空的div，可视区域渲染真实dom */}
        <div
          style={{
            height: `${8.66667 * rootFontSize * start}px`
          }}
        ></div>

        {props.lessons.list
          .slice(start, start + 3)
          .map((item: Lesson, index: number) => (
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

        <div
          style={{
            height: `${8.66667 *
              rootFontSize *
              (props.lessons.list.length - start - 3)}px`
          }}
        ></div>
      </Skeleton>
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
// 函数组件本来是不能有ref的，如果要使用ref 就需要用forwardRef包裹一层
export default forwardRef(LessonList)

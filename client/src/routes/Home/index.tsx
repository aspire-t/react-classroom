import React, { PropsWithChildren, useRef, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spin } from 'antd'

import { CombinedState, HomeState } from '@/typings'
import mapDispatchToProps from '@/store/actions/home'
import HomeHeader from './components/HomeHeader'
import HomeSliders from './components/HomeSliders'
import LessonList from './components/LessonList'
import { loadMore, downRefresh } from '../../utils/utils'

import './index.less'

// type PropsWithChildren<P> = P & { children?: ReactNode };
type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>

function Home(props: Props) {
  let homeContainer = useRef<HTMLDivElement>(null) //{current:null}=> {current:HTMLDivElement}
  let lessonList = useRef(null)
  useEffect(() => {
    loadMore(homeContainer.current, props.getLessons)
    downRefresh(homeContainer.current, props.refreshLessons)
  }, [])

  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
        refreshLessons={props.refreshLessons}
      ></HomeHeader>
      {/* 下拉刷新图标 */}
      <div className="refresh-loading">
        <Spin size="large" />
      </div>
      <div className="home-container" ref={homeContainer}>
        <HomeSliders
          sliders={props.sliders}
          getSliders={props.getSliders}
        ></HomeSliders>

        <LessonList
          ref={lessonList}
          container={homeContainer}
          lessons={props.lessons}
          getLessons={props.getLessons}
        ></LessonList>
      </div>
    </>
  )
}

const mapStateToProps = (state: CombinedState): HomeState => state.home

export default connect(mapStateToProps, mapDispatchToProps)(Home)

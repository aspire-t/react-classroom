import React, { PropsWithChildren, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { CombinedState, HomeState } from '@/typings'
import mapDispatchToProps from '@/store/actions/home'

import HomeHeader from './components/HomeHeader'
import HomeSliders from './components/HomeSliders'
import LessonList from './components/LessonList'

import './index.less'
import { getLesson } from '@/api/home'

// type PropsWithChildren<P> = P & { children?: ReactNode };
type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>

function Home(props: Props) {
  let homeContainer = useRef<HTMLDivElement>(null) //{current:null}=> {current:HTMLDivElement}
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
      ></HomeHeader>

      <div className="home-container" ref={homeContainer}>
        <HomeSliders
          sliders={props.sliders}
          getSliders={props.getSliders}
        ></HomeSliders>

        <LessonList
          lessons={props.lessons}
          getLessons={props.getLessons}
        ></LessonList>
      </div>
    </>
  )
}

const mapStateToProps = (state: CombinedState): HomeState => state.home

export default connect(mapStateToProps, mapDispatchToProps)(Home)

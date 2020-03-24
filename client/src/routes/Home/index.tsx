import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { CombinedState, HomeState } from '@/typings/state'
import mapDispatchToProps from '@/store/actions/home'

import HomeHeader from './components/HomeHeader'

import './index.less'
// type PropsWithChildren<P> = P & { children?: ReactNode };
type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>

function Home(props: Props) {
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
      ></HomeHeader>
    </>
  )
}

const mapStateToProps = (state: CombinedState): HomeState => state.home

export default connect(mapStateToProps, mapDispatchToProps)(Home)

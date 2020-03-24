import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { CombinedState, ProfileState, LOGIN_TYPES } from '@/typings/state'
import Nav from '@/components/Nav'
import mapDispatchToProps from '@/store/actions/home'

import './index.less'

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>

function Profile(props: Props) {
  let content

  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    content = null
  }

  return (
    <>
      <Nav history={props.history}>个人中心</Nav>
      {content}
    </>
  )
}

const mapStateToProps = (state: CombinedState): ProfileState => state.profile

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

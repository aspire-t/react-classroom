import React, { PropsWithChildren, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Descriptions, Button, Alert, Upload } from 'antd'

import { CombinedState, ProfileState, LOGIN_TYPES } from '@/typings/state'
import mapDispatchToProps from '@/store/actions/profile'
import Nav from '@/components/Nav'

import './index.less'

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>

function Profile(props: Props) {
  let content

  useEffect(() => {
    props.validate()
  }, [])

  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    content = null
  } else if (props.loginState === LOGIN_TYPES.LOGIN) {
    content = (
      <div className="user-info">
        <Descriptions title="当前用户">
          <Descriptions.Item label="用户名">
            {props.user.username}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
        </Descriptions>
        <Button type="danger" onClick={() => props.logout()}>
          退出
        </Button>
      </div>
    )
  } else {
    content = (
      <>
        <Alert
          type="warning"
          message="未登录"
          description="亲爱的用户你好，你尚未登录，请你注册或者登录"
        />
        <div style={{ textAlign: 'center', padding: '.5rem' }}>
          <Button type="dashed" onClick={() => props.history.push('/login')}>
            登录
          </Button>
          <Button type="dashed" onClick={() => props.history.push('/register')}>
            注册
          </Button>
        </div>
      </>
    )
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

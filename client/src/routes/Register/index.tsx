import React, { PropsWithChildren } from 'react'
import { Form, Input, Icon, Button, message } from 'antd'
import { RouteComponentProps, Link } from 'react-router-dom'
import { FormComponentProps } from 'antd/lib/form'
import { connect } from 'react-redux'

import { CombinedState, ProfileState } from '@/typings/state'
import mapDispatchToProps from '@/store/actions/profile'
import Nav from '@/components/Nav'

import './index.less'

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
> &
  FormComponentProps

function Register(props: Props) {
  const { getFieldDecorator } = props.form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // 验证字段
    props.form.validateFieldsAndScroll(async (errors: any, values) => {
      if (errors) {
        // 如果有errors有值，则表示有某些字段校验不通过
        message.error('注册信息不合法')
      } else {
        props.register(values)
      }
    })
  }

  return (
    <>
      <Nav history={props.history}>用户注册</Nav>
      <Form className="register-form" onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '用户名不能为空' }]
          })(
            <Input
              placeholder="用户名"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空' }]
          })(
            <Input
              placeholder="密码"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirmPassword', {
            rules: [{ required: true, message: '确认密码不能为空' }]
          })(
            <Input
              placeholder="确认密码"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: '邮箱不能为空' },
              {
                pattern: /@/,
                message: '邮箱格式不正确'
              }
            ]
          })(
            <Input
              placeholder="邮箱"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
          或者 <Link to="/login">登录</Link>
        </Form.Item>
      </Form>
    </>
  )
}
// WrappedRegister 就是一个高阶组件，回向Register组件里传递属性，getFieldDecorator等 可以在FormComponentProps 里面的 WrappedFormUtils看到
const WrappedRegister = Form.create({ name: '注册表单' })(Register)
let mapStateToProps = (state: CombinedState): ProfileState => state.profile
export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegister)

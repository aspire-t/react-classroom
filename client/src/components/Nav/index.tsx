import React, { PropsWithChildren } from 'react'
import { Icon } from 'antd'

import './index.less'

type Props = PropsWithChildren<{
  history: any
}>

function Nav(props: Props) {
  return (
    <header className="nav-header">
      <Icon type="left" onClick={() => props.history.goBack()} />
      {props.children}
    </header>
  )
}
export default Nav

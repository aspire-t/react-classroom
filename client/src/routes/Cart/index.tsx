import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, InputNumber, Popconfirm, Button, Row, Col, Badge } from 'antd'

import { CombinedState, CartState, CartItem, Lesson } from '@/typings'
import actions from '@/store/actions/cart'
import Nav from '@/components/Nav'

import './index.less'

interface Params {}

type Props = PropsWithChildren<
  RouteComponentProps<Params> &
    ReturnType<typeof mapStateToProps> &
    typeof actions
>

function Cart(props: Props) {
  const columns = [
    {
      title: '商品',
      dataIndex: 'lesson',
      render: (val: Lesson, row: CartItem) => {
        return (
          <>
            <p>{val.title}</p>
            <p>单价: ¥{val.price}元</p>
          </>
        )
      }
    },
    {
      title: '数量',
      dataIndex: 'count',
      render: (val: number, row: CartItem) => {
        return (
          <InputNumber
            size="small"
            min={1}
            value={val}
            onChange={value => props.changeCartItemCount(row.lesson.id, value)}
          />
        )
      }
    },
    {
      title: '操作',
      render: (val: number, row: CartItem) => {
        return (
          <Popconfirm
            title="是否要删除商品"
            // onConfirm={() => props.removeCartItem(row.lesson.id)}
            okText="是"
            cancelText="否"
          >
            <Button size="small" type="primary">
              删除
            </Button>
          </Popconfirm>
        )
      }
    }
  ]

  return (
    <>
      <Nav history={props.history}>购物车</Nav>
      <Table
        columns={columns}
        dataSource={props.cart}
        pagination={false}
      ></Table>
    </>
  )
}

let mapStateToProps = (state: CombinedState): { cart: CartState } => ({
  cart: state.cart
})
export default connect(mapStateToProps, actions)(Cart)

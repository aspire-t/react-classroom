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
            onConfirm={() => props.removeCartItem(row.lesson.id)}
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

  const rowSelection = {
    selectedRowKeys: props.cart
      .filter((item: CartItem) => item.checked)
      .map((item: CartItem) => item.lesson.id),

    onChange: (selectedRowKeys: string[]) => {
      //selectedRowKeys其实是一个由商品的ID组成的数组
      props.changeCheckedCartItems(selectedRowKeys)
    }
  }
  // 总数量
  let totalCount = props.cart
    .filter((item: CartItem) => item.checked)
    .reduce((total: number, item: CartItem) => total + item.count, 0)
  // 总价格
  let totalPrice = props.cart
    .filter((item: CartItem) => item.checked)
    .reduce(
      (total: number, item: CartItem) => total + item.count * item.lesson.price,
      0
    )
  return (
    <>
      <Nav history={props.history}>购物车</Nav>
      <Table
        columns={columns}
        dataSource={props.cart}
        pagination={false}
        rowSelection={rowSelection}
        rowKey={row => row.lesson.id}
      ></Table>
      <Row style={{ padding: '5px' }}>
        <Col span={4}>
          <Button type="danger" size="small" onClick={props.clearCartItems}>
            清空
          </Button>
        </Col>
        <Col span={7}>
          已选择了{totalCount > 0 ? <Badge count={totalCount} /> : 0}件商品
        </Col>
        <Col span={9}>总价 ¥{totalPrice}元</Col>
        <Col span={4}>
          <Button type="primary" size="small" onClick={props.settle}>
            结算
          </Button>
        </Col>
      </Row>
    </>
  )
}

let mapStateToProps = (state: CombinedState): { cart: CartState } => ({
  cart: state.cart
})
export default connect(mapStateToProps, actions)(Cart)

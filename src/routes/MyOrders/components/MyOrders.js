// @flow
import React from 'react'
import styles from './MyOrders.css'
import { List, Avatar, Icon } from 'antd'
import { Link } from 'react-router-dom'
// import PostPage from 'components/PostPage'

type Props = {}
type State = {
  orderList: Array<Object>
}

class MyOrders extends React.PureComponent<Props, State> {
  state = {
    orderList: []
  }
  componentDidMount () {
    const username = localStorage.getItem('username')
    fetch(`/order/get?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      orderList: res
    }))
  }
  render () {
    const { orderList } = this.state
    console.log(orderList)
    orderList && orderList.map(item => {
      item.href = `/good/${item.goodId}`
    })
    return (
      <List
        itemLayout='horizontal'
        dataSource={orderList}
        renderItem={item => (
          <Link to={item.href}>
            <List.Item key={item.title}>
              <List.Item.Meta
                avatar={<Avatar shape='square' size='large' src={item.imageUrl} />}
                title={item.title}
                description={<p style={{ color: 'red ' }}>
                  <Icon type='pay-circle-o' style={{ marginRight: 5 }} />
                  {item.price.toFixed(2)}*{item.count}={item.price * item.count}</p>}
        />
              <div>
                <p>收货人：{item.address.name}</p>
                <p>收货地址：{item.address.location[0]}
                  {item.address.location[1]}
                  {item.address.location[2]}
                  {item.address.detail}</p>
                <p>收货电话：{item.address.phoneNum}</p>
                <p>订单时间：{item.time}</p>
              </div>
            </List.Item>
          </Link>
    )}
  />
    )
  }
}

export default MyOrders

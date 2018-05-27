// @flow
import React from 'react'
import { Table, Button, message, Select, Icon } from 'antd'
import styles from './PointShop.css'
const Option = Select.Option

const columns = [{
  title: '图片',
  dataIndex: 'imageUrl',
  key: 'imageUrl'
},
{
  title: '名称',
  dataIndex: 'name',
  key: 'name'
},
{
  title: '价格',
  dataIndex: 'price',
  key: 'price'
}]
type Props = {}
type State = {
  visible: boolean,
  carsList: Array<Object>,
  selected: Object,
  price: Number,
  addressList: Array<Object>,
  address: Object,
  point: Number
}

class PointShop extends React.PureComponent<Props, State> {
  state = {
    visible: false,
    carsList: [],
    selected: {},
    point: 0,
    price: 0,
    addressList: [],
    address: {}
  }
  componentDidMount () {
    const username = localStorage.getItem('username')
    const tag = '积分商城'
    fetch(`/good/get?tag=${tag}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      carsList: res.map((item, index) => {
        return {
          key: item._id,
          name: item.title,
          goodId: item.goodId,
          imageUrl: <img src={item.imageUrl} />,
          image: item.imageUrl,
          count: 1,
          price: item.price * 100
        }
      })
    }))
    fetch(`/address/get?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      addressList: res[0].address
    }))
    fetch(`/info/get?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      point: res.points
    }))
  }
  account = () => {
    const { selected, address } = this.state
    console.log(selected)
    console.log(address)
    if (!selected.name) {
      message.destroy()
      message.info('请选择商品')
      return
    }
    if (!address.name) {
      message.destroy()
      message.info('请选择地址')
      return
    }
    if (selected.price > this.state.point) {
      message.destroy()
      message.info('积分不足')
      return
    }
    fetch('/info/point', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        point: this.state.point - selected.price * selected.count
      })
    })
    fetch('/order/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        title: selected.name,
        imageUrl: selected.image,
        price: selected.price,
        count: selected.count,
        goodId: selected.goodId,
        name: address.name,
        phoneNum: address.phoneNum,
        detail: address.detail,
        location: address.location
      })
    }).then(res => res.json())
    .then(res => {
      // 后端正确
      if (res.success) {
        message.destroy()
        message.success(res.message)
      } else {
        message.destroy()
        message.info(res.message)
      }
    })
    .catch(e => console.log('Oops, error', e))
    location.href = './myOrders'
  }
  render () {
    const { carsList, price, addressList, point } = this.state
    const option = addressList && addressList.map((item, index) => {
      return (
        <Option value={item} key={item._id}>{item.name}/{item.phoneNum}/{item.location[0]}
          {item.location[1]}{item.location[2]}/{item.detail}</Option>
      )
    })
    return (
      <div className={styles['car-box']}>
        <Table columns={columns} dataSource={carsList}
          rowSelection={{
            type: 'radio',
            onSelect: (value) => this.setState({ selected: value, price: value.count * value.price })
          }}
          pagination={{
            hideOnSinglePage: true
          }} />
        <Select style={{ width: 400 }} size='large' onChange={(value) => this.setState({ address: value })}>
          {option}
        </Select>
        <div className={styles['operator-list']}>
          <div className={styles['account-list']}>
            <h4><Icon type='pay-circle-o' style={{ color: 'red', marginRight: 10 }} />积分：{point}</h4>
          总价：￥{price.toFixed(2)}
            <Button size='large' type='primary' onClick={this.account}>结算</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default PointShop

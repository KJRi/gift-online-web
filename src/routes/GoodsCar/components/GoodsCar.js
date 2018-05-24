// @flow
import React from 'react'
import { Table, Button, message, Select } from 'antd'
import styles from './GoodsCar.css'
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
  title: '数量',
  dataIndex: 'count',
  key: 'count'
},
{
  title: '总价',
  dataIndex: 'price',
  key: 'price'
},
{
  title: '删除',
  dataIndex: 'operator',
  key: 'operator'
}]
type Props = {}
type State = {
  visible: boolean,
  carsList: Array<Object>,
  selected: Object,
  price: Number,
  addressList: Array<Object>,
  address: Object
}

class GoodsCar extends React.PureComponent<Props, State> {
  state = {
    visible: false,
    carsList: [],
    selected: {},
    price: 0,
    addressList: [],
    address: {}
  }
  deleteCar = (id: String) => {
    console.log(id)
    fetch('/car/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        carId: id
      })
    }).then(res => res.json())
  .then(res => {
    // 后端正确
    if (res.success) {
      message.destroy()
      message.success(res.message)
      location.reload()
    } else {
      message.destroy()
      message.info(res.message)
    }
  })
  .catch(e => console.log('Oops, error', e))
  }
  componentDidMount () {
    const username = localStorage.getItem('username')
    fetch(`/car/get?username=${username}`, {
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
          count: item.count,
          price: item.price.toFixed(2),
          operator: <Button onClick={() => this.deleteCar(item._id)}>删除</Button>
        }
      })
    }))
    fetch(`/address/get?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      addressList: res[0].address
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
    fetch('/car/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        carId: selected.key
      })
    })
    location.href = './myOrders'
  }
  resetCar = () => {
    fetch('/car/deleteAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username')
      })
    }).then(res => res.json())
  .then(res => {
    // 后端正确
    if (res.success) {
      message.destroy()
      message.success(res.message)
      location.reload()
    } else {
      message.destroy()
      message.info(res.message)
    }
  })
  .catch(e => console.log('Oops, error', e))
  }
  render () {
    const { carsList, price, addressList } = this.state
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
          <Button size='large' onClick={this.resetCar}>清空购物车</Button>
          <div className={styles['account-list']}>
          总价：￥{price.toFixed(2)}
            <Button size='large' type='primary' onClick={this.account}>结算</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default GoodsCar

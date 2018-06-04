// @flow
import React from 'react'
import { Table, Button, message, Select, InputNumber } from 'antd'
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
  title: '价格',
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
  address: Object,
  point: Number
}

class GoodsCar extends React.PureComponent<Props, State> {
  state = {
    visible: false,
    carsList: [],
    selected: {},
    point: 0,
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
          num: item.count,
          count: <InputNumber min={1} defaultValue={item.count} onChange={(e) => this.changeCount(item, e)} />,
          price: (item.price * item.count).toFixed(2),
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
    fetch(`/info/get?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      point: res.points
    }))
  }
  changeCount = (item: Object, e: Number) => {
    const username = localStorage.getItem('username')
    fetch('/car/point', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        id: item._id,
        count: e
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
          num: item.count,
          count: <InputNumber min={1} defaultValue={item.count} onChange={(e) => this.changeCount(item, e)} />,
          price: (item.price * item.count).toFixed(2),
          operator: <Button onClick={() => this.deleteCar(item._id)}>删除</Button>
        }
      })
    }))
  }
  account = () => {
    const { selected, address, addressList } = this.state
    const newAddress = addressList[address]
    if (!selected.name) {
      message.destroy()
      message.info('请选择商品')
      return
    }
    if (!newAddress.name) {
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
        count: selected.num,
        goodId: selected.goodId,
        name: newAddress.name,
        phoneNum: newAddress.phoneNum,
        detail: newAddress.detail,
        location: newAddress.location
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
    fetch('/info/point', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        point: this.state.point + selected.price * selected.num
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
    return (
      <div className={styles['car-box']}>
        <Table columns={columns} dataSource={carsList}
          rowSelection={{
            type: 'radio',
            onSelect: (value) => this.setState({ selected: value, price: value.price })
          }}
          pagination={{
            hideOnSinglePage: true
          }} />
        <Select style={{ width: 400 }} size='large' onChange={(value) => this.setState({ address: value })}>
          { addressList && addressList.map((item, index) => {
            return (
              <Option key={index}>{item.name}/{item.phoneNum}/{item.location[0]}
                {item.location[1]}{item.location[2]}/{item.detail}</Option>
            )
          })}
        </Select>
        <div className={styles['operator-list']}>
          <Button size='large' onClick={this.resetCar}>清空购物车</Button>
          <div className={styles['account-list']}>
          总价：￥{price}
            <Button size='large' type='primary' onClick={this.account}>结算</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default GoodsCar

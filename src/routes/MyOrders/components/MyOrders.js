// @flow
import React from 'react'
import styles from './MyOrders.css'
import { List, Avatar, Icon, Modal, Rate, message, Input, Form, Button } from 'antd'
import { Link } from 'react-router-dom'
const FormItem = Form.Item
const { TextArea } = Input

type Props = {
  form: Object
}
type State = {
  orderList: Array<Object>,
  visible: Boolean,
  goodId: String
}

class MyOrders extends React.PureComponent<Props, State> {
  state = {
    orderList: [],
    visible: false,
    goodId: ''
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
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleSubmit = (e) => {
    const username = localStorage.getItem('username')
    const { goodId } = this.state
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        fetch('/judge/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            goodId: goodId,
            rate: values.rate,
            content: values.content
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
    })
  }
  render () {
    const { orderList, visible } = this.state
    const { getFieldDecorator } = this.props.form
    orderList && orderList.map(item => {
      item.href = `/good/${item.goodId}`
    })
    return (
      <div>
        <List
          itemLayout='horizontal'
          dataSource={orderList}
          renderItem={item => (
            <List.Item key={item.title}>
              <List.Item.Meta
                avatar={<Link to={item.href}>
                  <Avatar shape='square' size='large' src={item.imageUrl} />
                </Link>}
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
                <Button onClick={() => this.setState({ visible: true, goodId: item.goodId })}>评价</Button>
              </div>
            </List.Item>
    )}
  />
        <Modal title='添加评价'
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
    >
          <Form onSubmit={this.handleSubmit} className={styles.formStyle}>
            <FormItem label='评分'>
              {getFieldDecorator('rate', {
                rules: [ { required: true, message: '请选择评分！' } ]
              })(
                <Rate />
        )}
            </FormItem>
            <FormItem label='具体评价'>
              {getFieldDecorator('content', {
                rules: [ { required: true, message: '请输入具体评价！' } ]
              })(
                <TextArea prefix={<Icon type='edit' style={{ fontSize: 13 }} />} placeholder='说说你的使用感想吧' />
              )}
            </FormItem>
            <FormItem>
              <Button className={styles.loginButton} type='primary' htmlType='submit'>
                  发布评论
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create({})(MyOrders)

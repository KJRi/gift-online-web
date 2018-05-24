// @flow
import React, { Component } from 'react'
import styles from './EditAddress.css'
import { Table, Icon, message, Button, Modal, Input, Cascader, Form } from 'antd'
import data from 'data'
const FormItem = Form.Item

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '电话',
  dataIndex: 'phoneNum',
  key: 'phoneNum'
}, {
  title: '省/市/区',
  dataIndex: 'location',
  key: 'location'
}, {
  title: '详细住址',
  dataIndex: 'detail',
  key: 'detail'
}, {
  title: '删除',
  dataIndex: 'operator',
  key: 'operator'
}]

type Props = {
  form: Object
}
type State = {
  visible: Boolean,
  addressList: Array<Object>
}

class EditAddress extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      visible: false,
      addressList: []
    }
  }
  componentWillMount () {
    const { form } = this.props
    const username = localStorage.getItem('username')
    fetch(`/address/get?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => {
      this.setState({
        addressList: res[0].address.map((item, index) => {
          console.log(item)
          return {
            key: item._id,
            name: item.name,
            location: <p>{item.location[0]}/{item.location[1]}/{item.location[2]}</p>,
            phoneNum: item.phoneNum,
            detail: item.detail,
            operator: <Button onClick={() => this.deleteAddress(item._id)}>删除</Button>
          }
        })
      })
    })
  }
  deleteAddress = (id: String) => {
    fetch('/address/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        addressId: id
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
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        fetch('/address/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: localStorage.getItem('username'),
            name: values.name,
            location: values.location,
            detail: values.detail,
            phoneNum: values.phoneNum
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
        setTimeout(() => {
          this.setState({
            visible: false
          })
          location.reload()
        }, 1000)
      }
    })
  }
  render () {
    const { addressList, visible } = this.state
    console.log(addressList)
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles['containel']}>
        <Button type='primary' onClick={() => { this.setState({ visible: true }) }}>添加地址</Button>
        <Table columns={columns}
          pagination={{
            hideOnSinglePage: true
          }}
          dataSource={addressList} />
        <Modal title='添加地址'
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
          >
          <Form onSubmit={this.handleSubmit} className={styles.formStyle}>
            <FormItem label='姓名'>
              {getFieldDecorator('name', {
                rules: [ { required: true, message: '请输入姓名！' } ]
              })(
                <Input prefix={<Icon type='edit' style={{ fontSize: 13 }} />} placeholder='姓名' />
                    )}
            </FormItem>
            <FormItem label='电话号码'>
              {getFieldDecorator('phoneNum', {
                rules: [ { required: true, message: '请输入电话号码！' } ]
              })(
                <Input prefix={<Icon type='phone' style={{ fontSize: 13 }} />} type='number' placeholder='电话号码' />
              )}
            </FormItem>
            <FormItem label='地区'>
              {getFieldDecorator('location', {
                rules: [ { required: true, message: '请选择地区！' } ]
              })(
                <Cascader
                  options={data} className={styles['type-item']} placeholder='请选择所在地区' />
              )}
            </FormItem>
            <FormItem label='具体地址'>
              {getFieldDecorator('detail', {
                rules: [ { required: true, message: '请输入具体地址！' } ]
              })(
                <Input prefix={<Icon type='edit' style={{ fontSize: 13 }} />} placeholder='具体地址' />
                    )}
            </FormItem>
            <FormItem>
              <Button className={styles.loginButton} type='primary' htmlType='submit'>
                        确认更改
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create({})(EditAddress)

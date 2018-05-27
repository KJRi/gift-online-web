// @flow
import React, { Component } from 'react'
import styles from './EditBirth.css'
import moment from 'moment'
import { Table, Icon, message, notification, DatePicker, Button, Modal, Input, Cascader, Form } from 'antd'
const FormItem = Form.Item

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '生日',
  dataIndex: 'birthday',
  key: 'birthday'
}, {
  title: '倒计时',
  dataIndex: 'location',
  key: 'location'
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

class EditBirth extends React.PureComponent<Props, State> {
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
    fetch(`/birth/get?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => {
      this.setState({
        addressList: res[0].people.map((item, index) => {
          if (moment(item.birthday).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
            notification.open({
              message:'生日提醒',
              description: `今天是你的朋友${item.name}的生日哦！快去为他/她送上一份礼物和祝福吧！`,
              icon: <Icon type='smile-circle' style={{ color: '#108ee9' }} />
            })
          }
          return {
            key: item._id,
            name: item.name,
            birthday: moment(item.birthday).format('YYYY-MM-DD'),
            location: moment(item.birthday, 'YYYYMMDD').fromNow(),
            operator: <Button onClick={() => this.deleteAddress(item._id)}>删除</Button>
          }
        })
      })
    })
  }
  deleteAddress = (id: String) => {
    fetch('/birth/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        peopleId: id
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
        fetch('/birth/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: localStorage.getItem('username'),
            name: values.name,
            birthday: values.birthday
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
        <Button type='primary' onClick={() => { this.setState({ visible: true }) }}>添加生日</Button>
        <Table columns={columns}
          pagination={{
            hideOnSinglePage: true
          }}
          dataSource={addressList} />
        <Modal title='添加生日'
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
            <FormItem label='生日'>
              {getFieldDecorator('birthday', {
                rules: [ { required: true, message: '请选择生日！' } ]
              })(
                <DatePicker style={{ width: '100%' }} />
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

export default Form.create({})(EditBirth)

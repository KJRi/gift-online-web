// @flow
import React, { Component } from 'react'
import { Input, Form, Icon, Button, message } from 'antd'
import styles from './Register.css'
const FormItem = Form.Item

class RegisterFormCom extends Component {
  constructor (props) {
    super(props)
  }

  handleRegister = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify({
            password: values.password,
            username: values.username
          })
        }).then(res => res.json())
        .then(res => {
          if (res.success) {
            message.destroy()
            message.success(res.message)
            window.location.href = '/'
          } else {
            message.destroy()
            message.info(res.message)
          }
        })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.containel}>
        <h2>注册</h2>
        <Form onSubmit={this.handleRegister} className={styles.formStyle}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }]
            })(
              <Input prefix={<Icon type='user' style={{ fontSize: 13 }} />} placeholder='Username' />
                      )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(
              <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password'
                placeholder='Password' />
                      )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirmPassword', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(
              <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password'
                placeholder='Repeat password' />
                      )}
          </FormItem>
          <FormItem>
            <Button className={styles.loginButton} type='primary' htmlType='submit'>
                          注册
                      </Button>
          </FormItem>
        </Form>
        <p>已有帐号？<a href='/login'>登录</a></p>
      </div>
    )
  }
}

const RegisterForm = Form.create()(RegisterFormCom)

export default RegisterForm

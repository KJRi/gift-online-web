// @flow
import React from 'react'
// import styles from './UserProfile.css'

import { Menu, Dropdown, Icon } from 'antd'

const menu = (
  <Menu>
    <Menu.Item key='0'>
      <a href='http://www.alipay.com/'>Your profile</a>
    </Menu.Item>
    <Menu.Item key='1'>
      <a href='http://www.taobao.com/'>Settings</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='3'>登出</Menu.Item>
  </Menu>
)

export const UserProfile = ({ user }: { user: Object }) => (
  <div>
    <Dropdown overlay={menu} trigger={['click']}>
      <a className='ant-dropdown-link' href='#'>
        { user && user.name || 'Admin' } <Icon type='down' />
      </a>
    </Dropdown>
  </div>
)

export default UserProfile

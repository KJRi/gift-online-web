// @flow
import React from 'react'
import styles from './UserProfile.css'
import { Avatar, Icon, Button, message } from 'antd'

type Props = {
  userinfo: Object,
}
type State = {
}

class UserProfile extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const { userinfo } = this.props
    const name = localStorage.getItem('username')
    return (
      <div className={styles['main-cont']}>
        {
          userinfo.headerImg
          ? <Avatar src={userinfo.headerImg} />
          : <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
        }
        <h2>{userinfo.username}</h2>
        {
          userinfo.description
          ? <p>{userinfo.description}</p>
          : ''
        }
        {
          userinfo.birthday
          ? <p><Icon type='heart-o' style={{ color: 'red' }} />{userinfo.birthday}</p>
          : ''
        }
        {
          userinfo.location
          ? <p><Icon type='environment' />{userinfo.location[0]}/{userinfo.location[1]}/{userinfo.location[2]}</p>
          : ''
        }
      </div>
    )
  }
}

export default UserProfile

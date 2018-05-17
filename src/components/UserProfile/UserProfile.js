// @flow
import React from 'react'
import styles from './UserProfile.css'
import { Avatar, Icon } from 'antd'

type Props = {
  userInfo: Object,
}
type State = {
}

class UserProfile extends React.PureComponent<Props, State> {
  render () {
    const { userName, descrpition, location } = this.props.userInfo
    return (
      <div className={styles['main-cont']}>
        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
        <h2>{userName}</h2>
        <p>{descrpition}</p>
        <p><Icon type='environment' />{location.province}/{location.city}</p>
      </div>
    )
  }
}

export default UserProfile

// @flow
import React from 'react'
import styles from './PersonalList.css'
import { Avatar, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import UserProfile from 'components/UserProfile'

type Props = {
  history: Object
}
type State = {
  userinfo: Object
}

class PersonalList extends React.PureComponent<Props, State> {
  logout: Function
  constructor (props: Props) {
    super(props)
    this.state = {
      userinfo: {}
    }
  }
  componentWillMount () {
    const username = localStorage.getItem('username')
    if (!username) {
      window.location.href = '/login'
    }
    fetch(`/info/get?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      userinfo: res
    }))
  }
  logout () {
    localStorage.clear()
    window.location.href = '/login'
  }
  render () {
    const username = localStorage.getItem('username')
    const { userinfo } = this.state
    console.log(userinfo)
    return (
      <div>
        <UserProfile {...{ userinfo }} />
        <Link to='/editAddress'><div className={styles['list-item']}>
          <Icon type='edit' />管理地址<Icon type='right' /></div></Link>
        <Link to='/editUserInfo'><div className={styles['list-item']}>
          <Icon type='solution' />修改信息<Icon type='right' /></div></Link>
        <Link to='/myOrders'><div className={styles['list-item']}>
          <Icon type='smile-o' />我的订单<Icon type='right' /></div></Link>
        <Link to='/myfav'><div className={styles['list-item']}>
          <Icon type='heart' />我的收藏<Icon type='right' /></div></Link>
        <div className={styles['list-item']} onClick={this.logout}><Icon type='logout' />退出登录<Icon type='right' /></div>
      </div>
    )
  }
}

export default withRouter(PersonalList)

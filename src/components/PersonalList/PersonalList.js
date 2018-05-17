// @flow
import React from 'react'
import styles from './PersonalList.css'
import { Avatar, Icon } from 'antd'
import { Link } from 'react-router-dom'

type Props = {}
type State = {}

class PersonalList extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div>
        <Link to='/circle'>
          <div className={styles['list-item']}>
            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
            <h3>USERNAME</h3>
            <p>description</p>
          </div>
        </Link>
        <Link to='/editPost'><div className={styles['list-item']}>
          <Icon type='edit' />发帖<Icon type='right' /></div></Link>
        <div className={styles['list-item']}><Icon type='solution' />修改信息<Icon type='right' /></div>
        <div className={styles['list-item']}><Icon type='smile-o' />我的关注<Icon type='right' /></div>
        <div className={styles['list-item']}><Icon type='like' />我的点赞<Icon type='right' /></div>
        <div className={styles['list-item']}><Icon type='logout' />退出登录<Icon type='right' /></div>
      </div>
    )
  }
}

export default PersonalList

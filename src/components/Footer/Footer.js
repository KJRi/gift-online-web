// @flow
import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import styles from './Footer.css'

type Props = {
  location: Location
}

type State = {
  current: string

}

class Footer extends React.Component<Props, State> {
  props: Props
  handleClick: (e: Object) => void

  activeMenuItem: Function

  constructor (props: Props) {
    super(props)

    this.state = { current: '-1' }

    this.handleClick = this.handleClick.bind(this)
    this.activeMenuItem = this.activeMenuItem.bind(this)
  }

  componentWillMount () {
    const { location } = this.props
    this.activeMenuItem(location)
  }

  componentWillReceiveProps (nextProps: Props) {
    const { location } = nextProps
    this.activeMenuItem(location)
  }

  handleClick (e: Object) {
    console.log(e)
    this.setState({ current: e.key })
  }

  activeMenuItem (location: Location) {
    const username = localStorage.getItem('username')
    const { pathname } = location
    let key
    switch (pathname) {
      case '/':
        key = 'home'
        break
      case '/detail':
        key = 'detail'
        break
      case '/goodsCar':
        key = 'goodsCar'
        break
      case '/personal':
        key = 'personal'
        break
      // default:
      //   key = 'home'
    }
    this.setState({ current: key })
  }

  render () {
    return (
      <footer className={styles['footer']}>
        <Menu
          theme='dark'
          mode='horizontal'
          onclick={this.handleClick}
          selectedKeys={[this.state.current]}
          defaultSelectedKeys={['1']}
          className={styles['footer-menu']}
        >
          <Menu.Item key='home'><Link to='/'><Icon type='home' />首页</Link></Menu.Item>
          <Menu.Item key='detail'><Link to='/detail'><Icon type='bars' />分类</Link></Menu.Item>
          <Menu.Item key='goodsCar'><Link to='/goodsCar'><Icon type='shopping-cart' />购物车</Link></Menu.Item>
          <Menu.Item key='personal'><Link to='/personal'><Icon type='user' />个人中心</Link></Menu.Item>
        </Menu>
      </footer>
    )
  }
}

export default withRouter(Footer)

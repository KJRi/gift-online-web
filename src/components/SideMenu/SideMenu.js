// @flow
import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import styles from './SideMenu.css'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

type Props = {
  location: Location
}

class SideMenu extends React.Component {
  props: Props

  state: {
    current: string
  }

  handleClick: (e: Object) => void

  activeMenuItem: () => void

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
    this.setState({ current: e.key })
  }

  activeMenuItem (location: Location) {
    const { pathname } = location
    let key
    switch (pathname) {
      case '/':
        key = '-1'
        break
      case '/github/k2data/repos':
        key = '0'
        break
      default:
        key = '-1'
    }
    this.setState({ current: key })
  }

  render () {
    return (
      <div className={styles['nav']}>
        <Menu onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode='inline'
          className={styles['menu']}
        >
          <Menu.Item key='-1'>
            <Icon type='area-chart' />
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key='0'>
            <Icon type='github' />
            <Link to='/github/k2data/repos'>Github</Link>
          </Menu.Item>
          <SubMenu key='sub1' title={<span><Icon type='mail' /><span>Navigation One</span></span>}>
            <MenuItemGroup title='Item 1'>
              <Menu.Item key='1'>Option 1</Menu.Item>
              <Menu.Item key='2'>Option 2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title='Item 2'>
              <Menu.Item key='3'>Option 3</Menu.Item>
              <Menu.Item key='4'>Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu key='sub2' title={<span><Icon type='appstore' /><span>Navigation Two</span></span>}>
            <Menu.Item key='5'>Option 5</Menu.Item>
            <Menu.Item key='6'>Option 6</Menu.Item>
            <SubMenu key='sub3' title='Submenu'>
              <Menu.Item key='7'>Option 7</Menu.Item>
              <Menu.Item key='8'>Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key='sub4' title={<span><Icon type='setting' /><span>Navigation Three</span></span>}>
            <Menu.Item key='9'>Option 9</Menu.Item>
            <Menu.Item key='10'>Option 10</Menu.Item>
            <Menu.Item key='11'>Option 11</Menu.Item>
            <Menu.Item key='12'>Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default withRouter(SideMenu)

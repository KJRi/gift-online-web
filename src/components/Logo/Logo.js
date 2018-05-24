// @flow
import React from 'react'
import styles from './Logo.css'

type Props = {
  location: Location
}
type State = {
  current: string
}
class Logo extends React.Component<Props, State> {
  props: Props
  activeMenuItem: Function

  constructor (props: Props) {
    super(props)

    this.state = { current: '-1' }

    this.activeMenuItem = this.activeMenuItem.bind(this)
  }
  componentWillMount () {
    this.activeMenuItem(location)
  }

  componentWillReceiveProps (nextProps: Props) {
    this.activeMenuItem(location)
  }

  activeMenuItem (location: Location) {
    const { pathname } = location
    let key
    switch (pathname) {
      case '/':
        key = '礼物帮手'
        break
      case '/detail':
        key = '详情页'
        break
      case '/goodsCar':
        key = '购物车'
        break
      case '/personal':
        key = '个人中心'
        break
      case '/myfav':
        key = '我的收藏'
        break
      case '/myOrders':
        key = '我的订单'
        break
      default:
        key = '礼物帮手'
    }
    this.setState({ current: key })
  }

  render () {
    return (
      <div className={styles['logo']}>
        {this.state.current}
      </div>
    )
  }
}

export default Logo

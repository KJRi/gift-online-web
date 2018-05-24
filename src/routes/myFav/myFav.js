// @flow
import React from 'react'
import styles from './myFav.css'
import { List, Avatar, Icon } from 'antd'
import { Link } from 'react-router-dom'

type Props = {
}
type State = {
  goodsList: Array<Object>
}

class myFav extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      goodsList: {}
    }
  }
  componentDidMount () {
    const username = localStorage.getItem('username')
    if (!username) {
      window.location.href = '/login'
    }
    fetch(`/fav/get?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      goodsList: res
    }))
  }
  render () {
    const { goodsList } = this.state
    if (goodsList.length) {
      goodsList && goodsList.map(item => {
        item.href = `/good/${item._id}`
      })
    }
    return (
      <List
        itemLayout='horizontal'
        dataSource={goodsList}
        renderItem={item => (
          <Link to={item.href}>
            <List.Item key={item.title}>
              <List.Item.Meta
                avatar={<Avatar shape='square' size='large' src={item.imageUrl} />}
                title={item.title}
                description={<p style={{ color: 'red ' }}>
                  <Icon type='pay-circle-o' style={{ marginRight: 5 }} />
                  {item.price.toFixed(2)}</p>}
        />
            </List.Item>
          </Link>
    )}
  />
    )
  }
}

// const ReactTemplate = (props: Props) => {
//   return (
//     <div>hello world</div>
//   )
// }

export default myFav

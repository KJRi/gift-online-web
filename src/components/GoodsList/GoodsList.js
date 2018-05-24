// @flow
import React from 'react'
import styles from './GoodsList.css'
import { List, Avatar, Icon } from 'antd'
import { Link } from 'react-router-dom'

type Props = {
  goodsList: props
}
type State = {}

class GoodsList extends React.PureComponent<Props, State> {
  render () {
    const { goodsList } = this.props
    console.log(goodsList)
    console.log(goodsList)
    goodsList && goodsList.map(item => {
      item.href = `/good/${item._id}`
    })
    return (
      <List
        itemLayout='horizontal'
        dataSource={goodsList}
        renderItem={item => (
          <Link to={item.href}>
            <List.Item key={item.title}>
              <List.Item.Meta
                avatar={<Avatar shape='square' size='large' src={item.imageUrl[0]} />}
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

export default GoodsList

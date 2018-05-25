// @flow
import React from 'react'
import styles from './Good.css'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Carousel, Card, List, Icon, Rate, message, InputNumber } from 'antd'
const { Meta } = Card

type Props = {
  match: Object
}
type State = {
  good: Object,
  url: Array,
  favState: Boolean,
  count: Number,
  judgeList: Array<Object>
}

class Good extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      good: {},
      url: [],
      favState: false,
      count: 1,
      judgeList: []
    }
  }
  componentDidMount () {
    const id = this.props.match.params.id
    const username = localStorage.getItem('username')
    fetch(`/good/get?goodId=${id}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      good: res,
      url: res.imageUrl
    }))
    fetch(`/fav/getIs?goodId=${id}&&username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => {
      if (res.length !== 0) {
        this.setState({ favState: true })
      }
    })
    fetch(`/judge/get?goodId=${id}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      judgeList: res
    })
    )
  }
  likeIt = () => {
    const { favState } = this.state
    if (favState) {
      // 取消收藏
      fetch('/fav/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          goodId: this.props.match.params.id
        })
      }).then(res => res.json())
        .then(res => {
          // 后端正确
          if (res.success) {
            message.destroy()
            message.success(res.message)
          } else {
            message.destroy()
            message.info(res.message)
          }
        })
        .catch(e => console.log('Oops, error', e))
      this.setState({
        favState: false
      })
    } else {
      // 收藏
      fetch('/fav/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          goodId: this.props.match.params.id,
          title: this.state.good.title,
          price: this.state.good.price,
          imageUrl: this.state.url[0]
        })
      }).then(res => res.json())
        .then(res => {
          // 后端正确
          if (res.success) {
            message.destroy()
            message.success(res.message)
          } else {
            message.destroy()
            message.info(res.message)
          }
        })
        .catch(e => console.log('Oops, error', e))
      this.setState({
        favState: true
      })
    }
  }
  carIt = () => {
    const { count } = this.state
    // 添加购物车
    fetch('/car/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        goodId: this.props.match.params.id,
        title: this.state.good.title,
        price: this.state.good.price,
        imageUrl: this.state.url[0],
        count: count
      })
    }).then(res => res.json())
      .then(res => {
        // 后端正确
        if (res.success) {
          message.destroy()
          message.success(res.message)
        } else {
          message.destroy()
          message.info(res.message)
        }
      })
      .catch(e => console.log('Oops, error', e))
  }
  render () {
    const { good, url, favState, judgeList } = this.state
    console.log(judgeList)
    return (
      <div className={styles['containal']}>
        <Carousel autoPlay>
          <div className={styles['img-content']}>
            <img src={url[0]} />
          </div>
          <div className={styles['img-content']}>
            <img src={url[1]} />
          </div>
          <div className={styles['img-content']}>
            <img src={url[2]} />
          </div>
          <div className={styles['img-content']}>
            <img src={url[3]} />
          </div>
        </Carousel>
        <Card
          actions={[<p onClick={this.likeIt}><Icon type={
            favState
            ? 'heart'
            : 'heart-o'
          } style={{ color: 'red' }} />{
            favState
            ? '取消收藏'
            : '收藏'
          }
          </p>,
            <div>
              <InputNumber min={1} defaultValue={1} onChange={(value) => this.setState({ count: value })} />
              <p onClick={this.carIt}><Icon type='shopping-cart' />添加购物车</p>
            </div>]}
  >
          <Meta
            style={{ fontSize: 20 }}
            title={good.title}
            description={<p style={{ color: 'red ' }}>
              <Icon type='pay-circle-o' style={{ marginRight: 5 }} />
              {
                (good.price)
                ? good.price.toFixed(2)
                : ''
              }</p>}
    />
        </Card>
        <List
          itemLayout='horizontal'
          dataSource={judgeList}
          renderItem={item => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={item.username}
                title={<Rate disabled defaultValue={item.rate} />}
                description={<p>{item.content}</p>}
          />
            </List.Item>
      )}
    />
      </div>
    )
  }
}

// const ReactTemplate = (props: Props) => {
//   return (
//     <div>hello world</div>
//   )
// }

export default withRouter(Good)

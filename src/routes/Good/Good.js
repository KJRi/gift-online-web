// @flow
import React from 'react'
import styles from './Good.css'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Carousel, Card, Icon, message } from 'antd'
const { Meta } = Card

type Props = {
  match: Object
}
type State = {
  good: Object,
  url: Array,
  favState: Boolean
}

class Good extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      good: {},
      url: [],
      favState: false
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
  render () {
    const { good, url, favState } = this.state
    console.log(favState)
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
          actions={[<Icon type={
            favState
            ? 'heart'
            : 'heart-o'
          } style={{ color: 'red' }} onClick={this.likeIt} />, <Icon type='edit' />, <Icon type='ellipsis' />]}
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

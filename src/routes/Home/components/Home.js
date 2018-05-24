// @flow
import React from 'react'
import styles from './Home.css'
import { Carousel } from 'antd'
import GoodsList from 'components/GoodsList'

type Props = {}
type State = {
  goodsList: Array<Object>
}

class Home extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      goodsList: []
    }
  }
  componentDidMount () {
    fetch('/good/get', {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({
      goodsList: res
    }))
  }

  render () {
    const { goodsList } = this.state
    return (
      <div className={styles['containal']}>
        <Carousel autoPlay>
          <div className={styles['img-content']}>
            <img src='https://m.360buyimg.com/babel/jfs/t17122/113/2548402456/84283/2f1f9093/5afe74efN2b4332f4.jpg' />
          </div>
          <div className={styles['img-content']}>
            <img src='https://img1.360buyimg.com/pop/jfs/t17959/164/2242151507/87295/c65ca4b6/5aec1384N41688de1.jpg' />
          </div>
          <div className={styles['img-content']}>
            <img src='https://img1.360buyimg.com/pop/jfs/t19108/345/2042626552/109160/c0242ce2/5ae19fbfN29da916a.jpg' />
          </div>
          <div className={styles['img-content']}>
            <img src='https://m.360buyimg.com/babel/jfs/t17122/113/2548402456/84283/2f1f9093/5afe74efN2b4332f4.jpg' />
          </div>
        </Carousel>
        <GoodsList {...{ goodsList }} />
      </div>
    )
  }
}
export default Home

// @flow
import React from 'react'
import styles from './Home.css'
import { Carousel, Card } from 'antd'
import { Link } from 'react-router-dom'
import GoodsList from 'components/GoodsList'
const { Meta } = Card

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
            <Link to='/good/5b0902a57821dac3702b12f4'>
              <img src='https://m.360buyimg.com/babel/jfs/t17122/113/2548402456/84283/2f1f9093/5afe74efN2b4332f4.jpg' />
            </Link>
          </div>
          <div className={styles['img-content']}>
            <Link to='/good/5b0a37707821dac3702b130b'>
              <img src='https://img1.360buyimg.com/pop/jfs/t17959/164/2242151507/87295/c65ca4b6/5aec1384N41688de1.jpg' />
            </Link>
          </div>
          <div className={styles['img-content']}>
            <Link to='/good/5b0a37207821dac3702b130a'>
              <img src='https://img1.360buyimg.com/pop/jfs/t19108/345/2042626552/109160/c0242ce2/5ae19fbfN29da916a.jpg' />
            </Link>
          </div>
          <div className={styles['img-content']}>
            <Link to='/good/5b0a32ee7821dac3702b1300'>
              <img src='https://img13.360buyimg.com/n1/jfs/t3343/159/941901891/209203/744d4410/58187af7N09a8d9a6.jpg' />
            </Link>
          </div>
        </Carousel>
        <Link to='/tagGift/生日'>
          <Card
            hoverable
            cover={<img src='/birthday.jpg' />}
  >
            <Meta
              title='生日专区'
    />
          </Card>
        </Link>
        <Link to='/tagGift/商务'>
          <Card
            hoverable
            cover={<img src='/business.jpg' />}
  >
            <Meta
              title='商务专区'
    />
          </Card>
        </Link>
        <Link to='/tagGift/结婚'>
          <Card
            hoverable
            cover={<img src='/marry.jpg' />}
  >
            <Meta
              title='结婚专区'
    />
          </Card>
        </Link>
        <Link to='/tagGift/纪念日'>
          <Card
            hoverable
            cover={<img src='memory.jpg' />}
  >
            <Meta
              title='纪念日'
    />
          </Card>
        </Link>
      </div>
    )
  }
}
export default Home

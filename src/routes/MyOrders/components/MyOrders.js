// @flow
import React from 'react'
import styles from './MyOrders.css'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
// import PostPage from 'components/PostPage'

type Props = {}
type State = {}

class MyOrders extends React.PureComponent<Props, State> {
  render () {
    const getLocalTime = (nS) => {
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    }
    const product = [
      {
        id: 1,
        price: 500,
        num: 5,
        name: 'absdfksabdfkjdsf'
      },
      {
        id: 2,
        price: 200,
        num: 5,
        name: 'abfkjdsf'
      }
    ]
    return (
      <div>
        {
         product && product.map((list, index) => {
           return (
             <div>
               <p>{getLocalTime(index)}</p>
               <div className={styles['cart-list-li']} key={index}>
                 <Row>
                   <Col span={3}>
                     <div className={styles['img']}>
                       <img src='http://www.huayifeng.top:8000/images/5.jpg' alt='' />
                     </div>
                   </Col>
                   <Col span={9}>
                     <div className={styles['text']}><Link to={'/detail/' + list.id}>{list.name}</Link></div>
                   </Col>
                   <Col span={4}>
                     <div className={styles['text']}>￥{list.price}</div>
                   </Col>
                   <Col span={4}>
                     <div className={styles['text']}>{list.num}</div>
                   </Col>
                   <Col span={4}>
                     <div className={styles['text']}>￥{list.num * list.price}</div>
                   </Col>
                 </Row>
               </div>
             </div>
           )
         })
       }
      </div>
    )
  }
}

export default MyOrders

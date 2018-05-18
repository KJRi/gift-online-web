// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Modal } from 'antd'
import QueueAnim from 'rc-queue-anim'
import styles from './GoodsCar.css'
// import PostPage from 'components/PostPage'

type Props = {}
type State = {
  visible: boolean
}

class GoodsCar extends React.PureComponent<Props, State> {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  clearproduct = () => {
    console.log('清空')
  }
  handleOk = () => {
    console.log('结算')
    this.setState({
      visible: false
    })
  }
  render () {
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
      <div className={styles['cart-list']}>
        <div className={styles['cart-list-title']}>
          <Row>
            <Col span={8}>
              商品信息
            </Col>
            <Col span={4} />
            <Col span={4}>
              单价
            </Col>
            <Col span={4}>
              数量
            </Col>
            <Col span={4}>
              金额
            </Col>
          </Row>
        </div>
        <QueueAnim type={['right', 'left']}>
          {
           product && product.map((list, index) => {
             return (
               <div>
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
        </QueueAnim>
        <div className={styles['total']}>
          <div onClick={this.clearproduct} className={styles['total-clear']}>
            清空
          </div>
          <div className={styles['total-all']} onClick={this.showModal}>
            去结算
          </div>
          <div className={styles['total-font']}>
            <span className={styles['total-symbol']}>&nbsp;￥</span>
            {product.reduce((sum, list) => {
              return sum + list.num * list.price
            }, 0)}
          </div>
        </div>
        <Modal title='提示框' visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <h5>确认购买？</h5>
          <p>（购买后请到我的订单查看）</p>
        </Modal>
      </div>
    )
  }
}

export default GoodsCar

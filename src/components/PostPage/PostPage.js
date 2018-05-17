// @flow
import React from 'react'
import styles from './PostPage.css'
import { Card, Row, Col, Icon } from 'antd'

type Props = {
  list: Object,
}
type State = {
}

class PostPage extends React.PureComponent<Props, State> {
  enterList: Function
  constructor (props: Props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const { title, description, adNum, comNum } = this.props.list
    return (
      <div className={styles['card-list']}>
        <Row gutter={24} style={{ marginTop: '4px' }}>
          <Col span={24}>
            <Card
              title={<h2 className={styles['card-title']}
              >{title}</h2>}
              className={styles['card']}
              hoverable>
              <div className={styles['card-body']}>{description}</div>
              <span><Icon type='heart' style={{ color: 'red' }} />{adNum}</span>
              &nbsp;|&nbsp;
              <span><Icon type='edit' />{comNum}</span>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PostPage

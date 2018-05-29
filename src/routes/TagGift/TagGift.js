// @flow
import React from 'react'
import styles from './TagGift.css'
import GoodsList from 'components/GoodsList'

type Props = {
    match: Object
}
type State = {
  goodsList: Array<Object>
}

class TagGift extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      goodsList: []
    }
  }
  componentDidMount () {
    const tag = this.props.match.params.tag
    console.log(tag)
    fetch(`/good/get?title=${tag}`, {
      method: 'GET'
    })
  .then(res => res.json())
  .then(res => {
    this.setState({
      goodsList: res
    })
  })
  }
  render () {
    const { goodsList } = this.state
    return (
      <GoodsList {...{ goodsList }} />
    )
  }
}

// const TagGift = (props: Props) => {
//   return (
//     <div>hello world</div>
//   )
// }

export default TagGift

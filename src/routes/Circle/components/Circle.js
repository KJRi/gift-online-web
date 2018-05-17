// @flow
import React from 'react'
import './Circle.css'
import PostPage from 'components/PostPage'
import UserProfile from 'components/UserProfile'
// const db = mongoose.connect(`mongodb://${project.dbHost}:${project.dbPort}/live`)
// const TestSchema = new mongoose.Schema({
//   name : { type:String },
//   age  : { type:Number, default:0 },
//   email: { type:String },
//   time : { type:Date, default:Date.now }
// })
// const TestModel = db.model('test1', TestSchema)
// const TestEntity = new TestModel({
//   name : 'helloworld',
//   age  : 28,
//   email: 'helloworld@qq.com'
// })
const arr = [
  {
    title: '1',
    description: 'fsadfgadfg',
    adNum: '100',
    comNum: '20'
  },
  {
    title: '3',
    description: 'fsadfgadfg',
    adNum: '300',
    comNum: '20'
  },
  {
    title: '5',
    description: 'fsadfgadfg',
    adNum: '500',
    comNum: '20'
  }
]
const userInfo = {
  userName: 'kjr',
  location: {
    city: 'linfen',
    province: 'shanxi'
  },
  descrpition: 'sfasdgasdcasdga',
  phoneNum: '13303574348'
}

type Props = {}
type State = {}

class Circle extends React.PureComponent<Props, State> {
  render () {
    // TestEntity.save(function (error, doc) {
    //   if (error) {
    //     console.log('error :' + error)
    //   } else {
    //     console.log(doc)
    //   }
    // })
    return (
      <div>
        <UserProfile {...{ userInfo }} />
        {
          arr && arr.map((list, index) => {
            return <PostPage {...{ list }} />
          })
        }
      </div>
    )
  }
}

export default Circle

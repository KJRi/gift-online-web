// @flow
import asyncRoute from '../asyncRoute'

export default asyncRoute.bind(null, (store) => {
  return Promise.all([
    import('./containers/CounterContainer'),
    import('./modules/counter'),
    Promise.resolve('counter')
  ])
})

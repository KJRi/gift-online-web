// @flow
import { injectReducer } from '../../store/reducers'
import asyncRoute from '../asyncRoute'

export default asyncRoute.bind(null, (store) => {
  return import('./modules/counter')
    .then((model) => {
      injectReducer(store, { key: 'counter', reducer: model.default })

      return import('./containers/CounterContainer')
    })
})

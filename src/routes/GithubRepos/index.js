// @flow
import { injectReducer } from '../../store/reducers'
import asyncRoute from '../asyncRoute'
// import type { Store } from 'redux'

export default asyncRoute.bind(null, (store) => {
  return import('./modules/githubRepos')
    .then((model) => {
      injectReducer(store, { key: 'githubRepos', reducer: model.default })

      return import('./containers/GithubRepos')
    })
})

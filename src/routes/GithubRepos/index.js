// @flow
import asyncRoute from '../asyncRoute'
// import type { Store } from 'redux'

export default asyncRoute.bind(null, (store) => {
  return Promise.all([
    import('./containers/GithubRepos'),
    import('./modules/githubRepos'),
    Promise.resolve('githubRepos')
  ])
})

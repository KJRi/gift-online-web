// @flow
import { injectReducer } from '../../store/reducers'
import type { Store } from 'redux'

export default (store: Store<*, *>) => ({
  path : 'github/k2data/repos',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: () => void) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const GithubRepos = require('./containers/GithubRepos').default
      const reducer = require('./modules/githubRepos').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'githubRepos', reducer })

      /*  Return getComponent   */
      cb(null, GithubRepos)

    /* Webpack named bundle   */
    }, 'github-repos')
  }
})

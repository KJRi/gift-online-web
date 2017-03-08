// @flow
// We only need to import the modules necessary for initial render
import type { Store } from 'redux'
import Home from './Home'
import GithubRepos from './GithubRepos'
import Counter from './Counter'

export const createRoutes = (store: Store<*, *>) => ({
  home: Home,
  githubRepos: GithubRepos(store),
  counter: Counter(store)
})

export default createRoutes

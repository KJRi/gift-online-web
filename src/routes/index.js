// @flow
// We only need to import the modules necessary for initial render
import Home from './Home'
import GithubRepos from './GithubRepos'
import Counter from './Counter'

// Force import during development to enable Hot-Module Replacement
// not need ?
// if (__DEV__) {
//   require('./Home/components/HomeView');
//   require('./GithubRepos/container/GithubRepos');
//   require('./Counter');
// }

export default {
  home: Home,
  githubRepos: GithubRepos(),
  counter: Counter()
}

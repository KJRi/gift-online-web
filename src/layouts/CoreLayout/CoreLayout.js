// @flow
import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import routes from '../../routes'
import SideNav from '../../components/SideNav'
import HeaderLogo from 'components/HeaderLogo'
import HeaderNav from '../../components/HeaderNav'

// normalize with antd and add icons & animations
import 'antd/lib/style/css'
import '../../styles/core.css'
import styles from './CoreLayout.css'

export const CoreLayout = () => (
  <div className={styles['core-layout']}>
    <div className={styles['logo']}>
      <HeaderLogo />
    </div>
    <div className={styles['side-nav']}>
      <div className={styles['side-nav__inner']}>
        <SideNav />
      </div>
    </div>
    <div className={styles['settings']}>
      <HeaderNav />
    </div>
    <div className={styles['viewport']}>
      <Switch>
        <Route path='/' component={routes.home} exact />
        <Route path='/counter' component={routes.counter} exact />
        <Route path='/github/k2data/repos' component={routes.githubRepos} exact />
      </Switch>
    </div>
  </div>
)

export default CoreLayout

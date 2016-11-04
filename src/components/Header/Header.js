// @flow
import React from 'react'
import { IndexLink, Link } from 'react-router'
import styles from './Header.css'

export const Header = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName={styles['route--active']}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName={styles['route--active']}>
      Counter
    </Link>
  </div>
)

export default Header

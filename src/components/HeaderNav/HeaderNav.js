// @flow
import React from 'react'
import UserProfile from 'components/UserProfile'
import styles from './HeaderNav.css'

export const HeaderNav = () => (
  <div className={styles['nav']}>
    <div style={{ float: 'right' }}>
      <UserProfile />
    </div>
  </div>
)

export default HeaderNav

// @flow
import React from 'react'
import './HeaderLogo.scss'

export const HeaderLogo = ({ title = 'starter-kit' }: { title: string }) => (
  <div className='header-logo'>
    <img src={'/logo.png'} />
    {title}
  </div>
)

export default HeaderLogo

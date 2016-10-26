import React from 'react'
import './HeaderLogo.scss'

export const HeaderLogo = ({ title = 'starter-kit' }) => (
  <div className='header-logo'>
    <img src={'/logo.png'} />
    {title}
  </div>
)

HeaderLogo.propTypes = {
  title: React.PropTypes.string
}

export default HeaderLogo

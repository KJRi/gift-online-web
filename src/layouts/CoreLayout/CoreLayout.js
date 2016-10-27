// @flow
import React from 'react'
// import Header from '../../components/Header'
import SideNav from '../../components/SideNav'
// normalize with antd and add icons & animations
import 'antd/lib/style/css'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }: { children: HTMLElement}) => (
  <div className='core-layout'>
    {
      // <Header />
    }
    <div className='core-layout__side-nav'>
      <div className='core-layout__side-nav__inner'>
        <SideNav />
      </div>
    </div>
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout

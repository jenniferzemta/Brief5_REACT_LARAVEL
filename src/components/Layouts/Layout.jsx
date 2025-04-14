import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Dashboard from '../../pages/Dashboard'

function Layout({children}) {
  return (
    <div>
      <Navbar />
      <div className='flex flex-1'>
        <div>
            <Sidebar/>
        </div>
        <div>
            {children}
        </div>
      </div>
    </div>
  )
}

export default Layout

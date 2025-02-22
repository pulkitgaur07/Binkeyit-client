import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user);
  return (
    <div>
      <section className='bg-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr]'>
                {/* left for menu */}
                <div className='py-4 sticky top-24 overflow-y-auto max-h-[calc(100vh-200px)] hidden lg:block border-r'>
                    <UserMenu />
                </div>
                {/* right for content */}
                <div className='bg-white px-4 min-h-[72vh]'>
                    <Outlet />
                </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

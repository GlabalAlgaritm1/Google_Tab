import React from 'react'
import { Outlet } from 'react-router'
import BG from '../img/img_bacround/glad.jpg'
const Layout = () => {
  return (
    <section>
      <img className='fixed -z-50 h-screen w-full' src={BG} alt="" />
        <main>
            <Outlet/>
        </main>
    </section>
  )
}

export default Layout
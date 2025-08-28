import React from 'react'
import Xeader from '../Commponents/Xeader'
import { Outlet } from 'react-router'
import Footer from '../Commponents/Footer'
import BG from '../img/img_bacround/glad.jpg'
const Layout = () => {
  return (
    <section>
      <img className='fixed -z-50 h-screen w-full' src={BG} alt="" />
        <Xeader/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </section>
  )
}

export default Layout
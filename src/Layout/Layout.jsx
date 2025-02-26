import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar'

export default function Layout() {

  return <>
  <SideBar/>


 <div className='p-4 sm:ml-64 mt-20'>

  <Outlet/>

 </div>



  </>
}

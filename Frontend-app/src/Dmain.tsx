import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Dash from './Dash'
import Dashnav from './Dashnav'
const Dmain = () => {
  
  return (
    <div className='flex flex-col gap-0 relative  '>
      <div className='w-full h-20  z-4
      0 absolute'>
       <Dashnav/>
       </div>
       <div className='flex h-[100vh]  '>
       <Dash/>
       <Outlet/>
       </div>
    </div>
  )
}

export default Dmain
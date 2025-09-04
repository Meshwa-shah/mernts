import React from 'react'
import group from './assets/user_group.png';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import {useUser,useClerk } from '@clerk/clerk-react'
import Cookies from 'js-cookie';
const Hero: React.FC = () => {
  const{ user } = useUser();
  const name = Cookies.get('name');
  const { openSignIn } = useClerk();
  const naviagate: NavigateFunction = useNavigate();
  function nav(): void{
  if(name === undefined){
     naviagate('/login');
  }
  else{
    naviagate('/Dashboard');
  }
  }
  return (
    <div className='w-full pt-15 max-sm:pt-30 z-1 '>
     <h1 className='text-center text-7xl font-bold max-sm:text-4xl'>Create amazing content<br/>
     with <span className='text-indigo-600'>AI tools</span></h1>
     <p className='text-center text-[22px] text-gray-600 mt-9  max-md:text-[11px] font-bold'>Transform your content creation with our suite of premium AI tools. <br />
       Write articles, generate images, and enhance your workflow.</p> 
     <div className='w-full flex justify-center gap-5 mt-6 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center'>
       <button className='bg-indigo-600 w-60 p-4 rounded-2xl text-white hover:scale-110 transition-all font-bold'
       onClick={nav}
       >Start creating now</button>
       <button className='bg-white  w-50 p-4 rounded-2xl text-black border hover:scale-110 transition-all font-bold'>Watch demo</button>
     </div>
     <div className='w-full mt-9 flex justify-center items-center gap-3.5'>
         <img src={group} alt="" className='h-11 max-sm:w-32'/>
         <p className='text-[20px]  text-gray-600 max-sm:text-[16px] font-bold'>Trusted by 10k+ people</p>
      </div>
      <div className='h-56'>
          
      </div>
    </div>
  )
}

export default Hero
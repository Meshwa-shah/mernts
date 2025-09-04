import React from 'react'
import logo from './assets/logo.svg'
import { Menu, X } from 'lucide-react'
import { useContext } from 'react';
import { AppContext } from './Context';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
const Dashnav: React.FC = () => {
  const {data, setdata} = useContext(AppContext)!
  const navigate: NavigateFunction = useNavigate();
  function set(): void{
    setdata(!data);
  }
  console.log(data)
  return (
    <div className='w-full h-18 shadow flex justify-between items-center bg-white [@media(max-height:730px)]:h-14.5'>
      <img src={logo} alt="" className='h-14 ml-10 [@media(max-height:730px)]:h-12.5' onClick={() => navigate('/')}/>
      {data ? <><X className='mr-10 hidden max-md:block' onClick={set}/></> : <>
      <Menu className='mr-10 hidden max-md:block' onClick={set}/></>}
    </div>
  )
}

export default Dashnav
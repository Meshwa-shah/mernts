
import { useUser, useClerk, Protect} from '@clerk/clerk-react'
import { HomeIcon, ImageIcon, ScissorsIcon, User2Icon ,LogOut} from 'lucide-react'
import { PenBox, Hash, EraserIcon, PaperclipIcon } from 'lucide-react';
import { useLocation, Link, type NavigateFunction, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './Context';
import Cookies from 'js-cookie';
import axios from 'axios';
import {toast} from 'react-toastify'
const Dash:React.FC = () => {
  const[plan, setplan] = useState<string>('');

  const {user} = useUser();
  const location = useLocation();
  const path: string = location.pathname;
  const { data } = useContext(AppContext)!
  const {signOut, openUserProfile} = useClerk();
  const navigate: NavigateFunction = useNavigate();
  const profile = Cookies.get('profile');
  const name = Cookies.get('name');
  function out(): void{
    Cookies.remove('name')
    Cookies.remove('profile');
    navigate('/');
  }
  // function open(): void{
  //    openUserProfile();
  // }
  useEffect(() => {
     async function finduser() {
          
          try{
          const name = Cookies.get('name');
          const find = await axios.post('http://localhost:8081/find', {
            "name": name
          });
          if(find.data.success === true){
           
            setplan(find.data.plan);
           
          }
          else{
            console.log("idk");
          }
          }
          catch(err: unknown){
            toast.error(err as string);
          }
         
        }
        finduser();
  }, [])
  return (
  <div>
    <div className='w-80  flex flex-col items-center  shadow gap-3 max-md:hidden transition h-full bg-white  justify-between'>
      <div className='w-full  flex flex-col items-center pt-26  gap-3  pb-6 [@media(max-height:730px)]:pb-0 [@media(max-height:730px)]:pt-17'>
      <img src={profile} alt="" className='size-16 rounded-full [@media(max-height:730px)]:size-14.5'/>
      <p className='font-medium text-[19px] [@media(max-height:730px)]:hidden'>{name}</p>
      <ul className='mt-4 w-full [@media(max-height:730px)]:mt-0.5'>
       <Link to='Dashboard'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
          ${path === '/Dashboard' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <HomeIcon size={18}/> Dashboard</li></Link>
        <Link to='Write'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
          ${path === '/Write' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <PenBox size={18}/> Write Article</li></Link>
        <Link to='Titles'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
          ${path === '/Titles' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <Hash size={18}/> Blog Titles</li></Link>
        <Link to='Images'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
          ${path === '/Images' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <ImageIcon size={18}/> Generate images</li></Link>
        <Link to='Background'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
          ${path === '/Background' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <EraserIcon size={18}/> Remove Background</li></Link>
        <Link to='Object'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
          ${path === '/Object' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <ScissorsIcon size={18}/> Remove Object</li></Link>
        <Link to='Resume'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
          ${path === '/Resume' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <PaperclipIcon size={18}/> Review resume</li></Link>
       <Link to='Community'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
          ${path === '/Community' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <User2Icon size={18}/> Community</li></Link>
       
      </ul>
     </div>
     <div className='w-full h-24 border-t-[0.5px] border-t-gray-400 flex justify-center items-center gap-3 cursor-pointer
     
     '>
      <img src={profile} alt="" className='size-10 rounded-full' />
      <div>
        <p className='font-medium'>{name}</p>
        <p className='font-medium text-gray-500'>
         {plan}&nbsp;plan
        </p>
      </div>
      <LogOut onClick={out} className='ml-14 text-gray-600'/>
     </div>
    </div>
     <div className={`w-80  flex flex-col items-center justify-between  gap-3 md:hidden transition h-full absolute bg-white z-30
      ${data ? 'block' : 'hidden'}
      `}>
      <div className='w-full  flex flex-col items-center pt-26  gap-3  pb-6  [@media(max-height:730px)]:pb-0 [@media(max-height:730px)]:pt-17'>
      <img src={profile} alt="" className='size-16 rounded-full [@media(max-height:730px)]:size-14'/>
      <p className='font-medium text-[19px]  [@media(max-height:730px)]:hidden'>{name}</p>
      <ul className='mt-4 w-full [@media(max-height:730px)]:mt-0.5'>
       <Link to='Dashboard'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
        [@media(max-height:600px)]:p-1.5
          ${path === '/Dashboard' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <HomeIcon size={18}/> Dashboard</li></Link>
        <Link to='Write'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
         [@media(max-height:600px)]:p-1.5
          ${path === '/Write' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <PenBox size={18}/> Write Article</li></Link>
        <Link to='Titles'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
         [@media(max-height:600px)]:p-1.5
          ${path === '/Titles' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <Hash size={18}/> Blog Titles</li></Link>
        <Link to='Images'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
         [@media(max-height:600px)]:p-1.5
          ${path === '/Images' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <ImageIcon size={18}/> Generate images</li></Link>
        <Link to='Background'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%]
         [@media(max-height:600px)]:p-1.5 
          ${path === '/Background' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <EraserIcon size={18}/> Remove Background</li></Link>
        <Link to='Object'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
         [@media(max-height:600px)]:p-1.5
          ${path === '/Object' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <ScissorsIcon size={18}/> Remove Object</li></Link>
        <Link to='Resume'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
         [@media(max-height:600px)]:p-1.5
          ${path === '/Resume' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <PaperclipIcon size={18}/> Review resume</li></Link>
       <Link to='Community'><li className={`flex text-[17px] gap-2 items-center font-medium p-3 w-[80%] rounded-md ml-[10%] 
        [@media(max-height:600px)]:p-1.5
          ${path === '/Community' ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'text-black'}`}>
          <User2Icon size={18}/> Community</li></Link>
       
      </ul>
      </div>
       <div className='w-full h-24 border-t-[0.5px] border-t-gray-400 flex justify-center items-center gap-3 cursor-pointer'>
      <img src={profile} alt="" className='size-10 rounded-full' />
      <div>
        <p className='font-medium'>{name}</p>
        <p className='font-medium text-gray-500'>
       {plan}&nbsp;plan
        </p>
      </div>
      <LogOut onClick={out} className='ml-14 text-gray-600'/>
     </div>
    </div>
    
    </div>
  )
}

export default Dash
import logo from './assets/logo.svg';
import { useEffect } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import {useClerk,  useUser} from '@clerk/clerk-react';
import { ArrowRight, Cookie } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify'
import Cookies from 'js-cookie';
import Background from './Background';
const Nav: React.FC = () => {
 
 console.log(localStorage.getItem("value"));
  const { user } = useUser();
  const name = Cookies.get('name');
  const profile = Cookies.get('profile');
  useEffect(() => {
    
    if(user?.fullName !== undefined   && localStorage.getItem("value") !== null){
     
      async function check(): Promise<void>{
          try{
               const send = await axios.post('http://localhost:8081/adduser', {
                   name: user?.fullName
              });
           if(send.data.success === true){
              toast.success(send.data.message);
          }
        else{
         toast.error(send.data.message);
          }
  }
  catch(err: unknown){
   toast.error(err as string);
  }
      finally{
        localStorage.removeItem("value");
      }
      }
      check();
    }
   
  }, [user])
  const navigate: NavigateFunction = useNavigate();


  
  const{ openSignIn, signOut } = useClerk();
  function openout(): void{
    if(window.confirm("Are you sure you wont to logout ?")){
    
      Cookies.remove('name')
      Cookies.remove('profile');
      location.reload();
    }
    
  }
  async function signin(): Promise<void>{
    navigate('/login');
   /* try{
    const send = await axios.post('http://localhost:8081/adduser', {
      name: user?.fullName
    });
    if(send.data.success === true){
         toast.success(send.data.message);
    }
    else{
      toast.error(send.data.message);
    }
  }
  catch(err: unknown){
   toast.error(err as string);
  }
  */
 
  }
  return (
    <div className='h-20 flex items-center px-8 font-semibold list-none backdrop-blur-3xl sticky top-0'>
    <ul className=' w-4/5 h-full flex items-center justify-between ml-[10%] max-sm:w-full max-sm:ml-0'>
     <li><img src={logo} alt="" className='h-14 max-sm:h-10' onClick={() => navigate('/')}/></li>
     {name !== undefined ? <div onClick={openout}><img src={profile} alt="" className='size-8 rounded-full'/></div> : (
    <li><button className='p-3 w-56 rounded-4xl bg-indigo-700 text-white max-sm:w-45 flex justify-center items-center gap-1' 
    onClick={signin}>Get Started<ArrowRight/></button></li> )}
    </ul>
    </div>
  )
}

export default Nav
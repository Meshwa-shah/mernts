import React, { useState, useEffect , useContext} from 'react'
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import{toast} from 'react-toastify'
import { SparklesIcon, 
  GemIcon
} from 'lucide-react'
import { useAuth, useUser } from '@clerk/clerk-react';
import { Protect } from '@clerk/clerk-react';
import axios from 'axios';
import Markdown from 'react-markdown';
import Cookies from 'js-cookie';
import { AppContext } from './Context';
import App from './App';
type arr = {
  prompt: string,
  type: string,
  res: string,
  _id: string,
  __v: number
}

const Dashboard:React.FC = () => {
  const[content, setcontent] = useState<Array<arr>>([]);
  const[loading, setloading] = useState<boolean>(false);
  const[exp, setexp] = useState<number | null>(null);
  const[ex, setex] = useState<boolean>(false);
  const[plan, setplan] = useState<string>('');
  
  
  function set(key: number){
    if(key !== exp){
    setexp(key);
    }
    else{
      setexp(null);
    }
    }
  console.log(content);
  const { user } = useUser();
  console.log(user?.fullName);
  console.log(content);
  const navigate: NavigateFunction = useNavigate();
   useEffect(() => {
      const check = Cookies.get('name');
      if(check === undefined){
        navigate("/");
        toast.error("Please Signup or Signin to continue");
      }
      else{
        async function finduser() {
          setloading(true)
          try{
          const name = Cookies.get('name');
          const find = await axios.post('http://localhost:8081/find', {
            "name": name
          });
          if(find.data.success === true){
            setcontent([...find.data.blog, ...find.data.title, ...find.data.resume]);
            setplan(find.data.plan);
           
          }
          else{
            console.log("idk");
          }
          }
          catch(err: unknown){
            toast.error(err as string);
          }
          finally{
            setloading(false);
          }
        }
        finduser();
      }
   }, [])    
      
  return (
    <div className='w-[79%] bg-blue-50 max-md:w-full pt-32 pl-[4%] overflow-y-scroll pb-4'>
        <div className='flex flex-wrap gap-7'>
          <div>
          <div className='bg-white shadow w-80 rounded-[10px] flex p-6 justify-between items-center gap-3'>
            <div>
              <p className='font-medium text-gray-600 text-[17px]'>Total creations</p>
              <p className='font-bold text-black text-2xl'>{content.length}</p>
            </div>
             <div className='bg-blue-500 p-4 rounded-[14px] '>
              <SparklesIcon className='text-white'/>
             </div>
         </div>
        </div>
       <div>
         <div className='bg-white shadow w-80 rounded-[10px] flex p-6 justify-between items-center gap-3'>
            <div>
              <p className='font-medium text-gray-600 text-[17px]'>Active Plan</p>
              <p className='font-bold text-black text-2xl'>
              {plan}
        
              </p>
            </div>
             <div className='bg-fuchsia-500 p-4 rounded-[14px] '>
              <GemIcon className='text-white'/>
             </div>
         </div>
         </div>
        </div>
     <p className='text-[19px] text-black mt-8 font-medium'>Recent Creations</p>  
     {/* <div className=' h-20 bg-white inline-block w-[600px] max-lg:w-[94%] max-md:w-[600px] max-sm:w-[94%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum molestiae accusamus vitae perferendis corporis exercitationem fuga cum laboriosam iste modi.</div> */}
     {loading ? <><p className='text-fuchsia-500 text-2xl text-center mt-[5%]'>Loading...</p></> : <>
    
     <div className='w-full flex flex-col justify-start items-start  gap-6 mt-4'>
       {content.map((el, i) => {
        return <div className='w-[95%] bg-white shadow px-5 py-5 cursor-pointer rounded-[10px] transition-all' key={i} onClick={() => set(i)}>
          <div className='flex justify-between items-center'>
           <div>
            <p className=' text-black text-[19px]'>{el.prompt}</p>
            <p className=' text-gray-500 text-[19px]'>{el.type}</p>
           </div>
           <span className='bg-blue-100 p-1 rounded-3xl w-20 text-center border-[1px] border-blue-400 text-blue-700'>
            {el.type}
           </span>
        
           </div>
              <div className={`  overflow-y-scroll ${exp === i ? 'block' : 'hidden'}`}>
             <div className='reset-tw'>
             <Markdown>
              {el.res}
             </Markdown>
            </div>
           </div>
        </div>
       })

       }
     </div>
     </>}
</div>
  )
}

export default Dashboard
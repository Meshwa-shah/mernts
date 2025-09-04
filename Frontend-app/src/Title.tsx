import React, { useState , useEffect} from 'react'
import {   HashIcon, SparklesIcon} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {useUser} from '@clerk/clerk-react'
import { type NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios';
import Markdown from 'react-markdown'
import Cookies from 'js-cookie'
type arr= {
  length: string
}
type arr2 = {
  type: string,
  res: string,
 prompt: string,
 _id: string,
  __v: number
}
const Title = () => {
    const navigate: NavigateFunction = useNavigate();
    const { user } = useUser();
    const p1 = document.getElementById('p1') as HTMLInputElement;
    
         useEffect(() => {
              const check  = Cookies.get('name');
              if(check === undefined){
                navigate("/");
                toast.error("Please Signup or Signin to continue");
              }
           }, []) 
   const [num, setnum] = useState<number>(0);
   
    const [cont, setcont] = useState<string | undefined>('General');
    const[content, setcontent] = useState<Array<arr2>>([]);
    const[prompt, setprompt] = useState<string>('')

    const obj: arr[] = [
      {
        length: "General"
      },
      {
        length: "Technology"
      },
       {
        length: "Business"
      },
      {
        length: "Health"
      },
      {
        length: "Lifestyle"
      },
      {
        length: "Education"
      },
       {
        length: "Travel"
      },
      {
        length: "Food"
      }
    ]
     
     function handleclk(i : number){
         console.log(i)
         const find = obj.find((_, i) => {
            return i === i
         })
         setnum(i)
         setcont(obj[i].length);
  }
  async function submit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
      e.preventDefault();
      if(prompt.length === 0){
         toast.error("Please write a valid prompt");
         return;
      }
      try{
         const name = Cookies.get('name');
         p1.innerHTML = "Generating Title...";
         const submit = await axios.post('http://localhost:8081/generatetitle', {
           prompt: prompt,
           topic: cont,
           name:  name,
           type: 'Title'
         });
         if(submit.data.success === true){
          toast.success("Your title generated");
          setcontent([submit.data.data]);
         }
         else{
          toast.error(submit.data.message);
         }
      }
      catch(err: unknown){
        toast.error(err as string)
      }
     finally{
      p1.innerHTML = "Generate Title";
     }
  }
  return (
      <div className='w-[79%] bg-blue-50 max-md:w-full pt-26 pl-[2%] max-sm:pl-[6%] roll pb-3 overflow-y-scroll'>
        <div className='flex flex-wrap gap-3'>
            <div className='bg-white shadow rounded p-5.5 w-[600px] max-lg:w-[93%]'>
                <div className='flex gap-6 justify-start items-center'><SparklesIcon className='text-fuchsia-700' size={30}/> 
                <p className='text-2xl text-gray-700 font-bold max-sm:text-[20px]'>AI Title Generator</p></div>
                <form>
                 <p  className='mt-8 text-[18px] font-medium text-gray-700'>Article Topic</p>
                 <input type="text"  className='w-[99%] h-12 rounded border-[1px] border-gray-400 mt-3 ml-[0.5%] 
                 font-medium text-gray-500 pl-3.5' required
                 onChange={(e) => setprompt(e.target.value)}
                 placeholder='The future of artificial intelligence is...'
                 />
                 <p  className='mt-5 text-[18px] font-medium text-gray-700'>Category</p>
                 <div className='flex flex-wrap gap-4 mt-4'>
                     {
                      obj.map((el, i) => {
                        return <span key={i}  
                        data-id={i}
                        className={` border-[1px] rounded-3xl py-1 px-6 cursor-pointer 
                        ${num === i ? 'bg-fuchsia-50 border-fuchsia-500' : 'border-gray-400'}
                        `}
                        onClick={() => handleclk(i)}
                        >
                          <p className={`  font-medium text-[15px] 
                          ${num === i ? 'text-fuchsia-500' : 'text-gray-500'}  
                          `}>{el.length}</p>
                        </span>
                      })
                     }
                 </div>
                 <button className='flex gap-2 mt-16 w-[99%] ml-[0.5%] justify-center py-3.5 rounded text-white
                 font-medium bg-gradient-to-r from-fuchsia-700 to-fuchsia-400
                 '
                 onClick={submit}
                 >
                  <HashIcon className='text-white'/> <p id='p1'>Generate Title</p></button>
                   </form>
            </div>
             <div className={`bg-white shadow rounded p-5.5 w-[600px] max-lg:w-[93%] 
              ${content.length === 0 ? 'h-[455px]' : 'h-[505px]'}
              `}>
              <div className='flex gap-6 justify-start items-center'><HashIcon className='text-fuchsia-700' size={30}/> 
                <p className='text-2xl text-gray-700 font-bold max-sm:text-[20px]'>Generated titles</p></div>
                <div className={`w-full  mt-3 ${content.length === 0 ? 'h-[365px]' : 'h-[415px] overflow-y-scroll'} `}>
                     {content.length === 0 ? <>
                     <div className='w-full h-full pt-28'>
                     <HashIcon className=' text-gray-400 text-center w-full' size={40}/>
                     <p className='text-gray-400 text-center font-medium mt-6'>Enter a topic and click “Generate title” to get started</p>
                    </div>
                     </>
                      : <>
                      <div className='reset-tw'>
                          <Markdown>
                            {content[0].res}
                          </Markdown>
                      </div>
                      </>
                     }
                </div>
             </div>
        </div>
 </div>
  )
}

export default Title
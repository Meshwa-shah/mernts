import React, { useState, useEffect } from 'react'
import {   ImageIcon, SparklesIcon} from 'lucide-react'
import Switch  from '@mui/material/Switch'
import { useNavigate } from 'react-router-dom'
import {useUser} from '@clerk/clerk-react'
import { type NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
type arr= {
  length: string
}
type arr2 = {
  prompt: string,
  type: string,
  availabe: boolean,
  likedby: [string],
  likes: number,
  image: {
    url: string,
    public_id: string,
    secure_url: string
  }
}
const Images = () => {
   const plan = Cookies.get('plan')
      console.log(plan);
  const navigate: NavigateFunction = useNavigate();
  const p1 = document.getElementById("p1") as HTMLInputElement;
  const { user } = useUser();
  useEffect(() => {
                 const check = Cookies.get('name');;
                 if(check === undefined){
                   navigate("/");
                   toast.error("Please Signup or Signin to continue");
                 }
    }, []) 
   const [num, setnum] = useState<number>(0);
      const [cont, setcont] = useState<string | undefined>('Realistic');
      const[content, setcontent] = useState<Array<arr2>>([]);
      const[publish, setpublish] = useState<boolean>(false);
      const[prompt, setprompt] = useState<string>('');
      const[url, seturl] = useState<string>('');
      console.log(publish);
        const obj: arr[] = [
      {
        length: "Realistic"
      },
      {
        length: "Ghibli"
      },
       {
        length: "Anime"
      },
      {
        length: "Cartoon"
      },
      {
        length: "Fantasy"
      },
       {
        length: "Realistic"
      },
      {
        length: "3D"
      },
      {
        length: "Portrait"
      }
    ]
    function changepublish(){
      setpublish(!publish)
    }
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
     if(plan !== "Premium"){
      toast("Please select a premium plan");
      return;
     }
      const name = Cookies.get('name');
      p1.innerHTML = "Generating Image..."
      const submit = await axios.post('http://localhost:8081/generateImage', {
        name: name,
        prompt: prompt,
        publish: publish,
        type: "Image",
        style: cont
      })
      if(submit.data.success === true){
           toast.success("Your image generated");
           setcontent([submit.data.data]);
           seturl(submit.data.data.image.url);
      }
      else{
        toast.error(submit.data.message);
      }
    }
    catch(err: unknown){
    toast.error(err as string)
    }
    finally{
      p1.innerHTML = "Generate Image";
    }
   }
   return (
       <div className='w-[79%] bg-blue-50 max-md:w-full pt-26 pl-[2%] max-sm:pl-[6%] roll pb-3 overflow-y-scroll'>
         <div className='flex flex-wrap gap-3'>
             <div className='bg-white shadow rounded p-5.5 w-[600px] max-lg:w-[93%]'>
                 <div className='flex gap-6 justify-start items-center'><SparklesIcon className='text-green-600' size={30}/> 
                 <p className='text-2xl text-gray-700 font-bold max-sm:text-[20px]'>AI Image Generator</p></div>
                 <form>
                  <p  className='mt-8 text-[18px] font-medium text-gray-700'>Describe Your Image</p>
                  <textarea   className='w-[99%] h-28 rounded border-[1px] border-gray-400 mt-3 ml-[0.5%] 
                  font-medium text-gray-500 pl-3.5 pt-2' 
                  placeholder='Describe what you want to see in the image...' required
                  onChange={(e) => setprompt(e.target.value)}
                  ></textarea>
                  <p  className='mt-5 text-[18px] font-medium text-gray-700'>Style</p>
                  <div className='flex flex-wrap gap-4 mt-4'>
                      {
                       obj.map((el, i) => {
                         return <span key={i}  
                         data-id={i}
                         className={` border-[1px] rounded-3xl py-1 px-6 cursor-pointer 
                         ${num === i ? 'bg-green-50 border-green-700' : 'border-gray-400'}
                         `}
                         onClick={() => handleclk(i)}
                         >
                           <p className={`  font-medium text-[15px] 
                           ${num === i ? 'text-green-700' : 'text-gray-500'}  
                           `}>{el.length}</p>
                         </span>
                       })
                      }
                  </div>
                  <div className='mt-8 flex justify-start items-center '>
                 <Switch color="success"
                 onChange={changepublish}
                 />
                 <p className='text-[16.5px] text-black font-medium'>Make this image Public</p>
                  </div>
                  <button className='flex gap-2 mt-8 w-[99%] ml-[0.5%] justify-center py-3.5 rounded text-white
                  font-medium bg-gradient-to-r from-green-600 to-green-400
                  '
                  onClick={submit}
                  >
                   <ImageIcon className='text-white'/> <p id='p1'>Generate Image</p></button>
                    </form>
             </div>
              <div className={` bg-white shadow rounded p-5.5 w-[600px] max-lg:w-[93%]
                ${content.length === 0 ? 'h-[455px]' : 'h-auto'}
                `}>
               <div className='flex gap-6 justify-start items-center'><ImageIcon className='text-green-600' size={30}/> 
                 <p className='text-2xl text-gray-700 font-bold max-sm:text-[20px]'>Generated Image</p></div>
                 <div className={`w-full  mt-3  
                  ${content.length === 0 ? 'h-[365px]' : 'h-auto'}
                  `}>
                      {content.length === 0 ? <>
                      <div className='w-full h-full pt-36'>
                      <ImageIcon className=' text-gray-400 text-center w-full' size={40}/>
                      <p className='text-gray-400 text-center font-medium mt-6'>
                        Enter a topic and click “Generate image” to get started
                      </p>
                     </div>
                    
                    
                      </>
                       : <>
                       <img src={url} alt="" className='h-full w-full rounded'/>
                       </>
                      }
                 </div>
              </div>
         </div>
  </div>
   )
}

export default Images
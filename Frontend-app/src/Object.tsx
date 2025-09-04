import React, { useState, useEffect } from 'react'
import { ScissorsIcon, SparklesIcon} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {useUser} from '@clerk/clerk-react'
import { type NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios';
import Cookies from 'js-cookie'
type arr2 = {
  prompt: string,
  type: string
  image: {
    url: string
  }
}
const Object = () => {
  const plan = Cookies.get('plan')
  const navigate: NavigateFunction = useNavigate();
   const p1 = document.getElementById("p1") as HTMLInputElement;
    const { user } = useUser();
    useEffect(() => {
                   const check = Cookies.get('name')
                   if(check === undefined){
                     navigate("/");
                     toast.error("Please Signup or Signin to continue");
                   }
      }, []) 
const[content, setcontent] = useState<Array<arr2>>([]);
const[prompt, setprompt] = useState<string>('');
const[file, setfile] = useState<File | null>(null);
const[url, seturl] = useState<string>('')
console.log(url);
function setf(e: React.ChangeEvent<HTMLInputElement>){
   if(e.target.files && e.target.files.length > 0){
              setfile(e.target.files[0]);
  }
}

async function submit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
  e.preventDefault();
   if(prompt.length === 0 || file === null){
    toast.error("Please write a valid prompt or select a file");
     return;
  }
 
  try{
    if(plan !== "Premium"){
                toast("Please select a premium plan");
                return;
    }
    const name = Cookies.get('name');
    p1.innerHTML = "Removing Object...";
    const formdata: FormData = new FormData();
    if(name !== undefined){
      formdata.append("image", file);
      formdata.append("name", name);
      formdata.append("prompt", prompt);
      formdata.append("type", "Object");
    }

     const submit = await axios.post('http://localhost:8081/removeobject' , formdata, {
             headers:{
               "Content-Type": "multipart/form-data",
            },
      });
     if(submit.data.success === true){
         setcontent([submit.data.data]);
         seturl(submit.data.data.image.url);
         toast.success("Your removed object image is generated");
     }
     else{
      toast.error(submit.data.message);
     }
  }
  catch(err: unknown){
    toast.error(err as string)
  }
  finally{
    p1.innerHTML = "Remove Object";
  }
}
  return (
     <div className='w-[79%] bg-blue-50 max-md:w-full pt-26 pl-[2%] max-sm:pl-[6%] overflow-y-scroll  pb-3'>
           <div className='flex flex-wrap gap-3'>
             <div className='bg-white shadow rounded p-5.5 w-[600px] max-lg:w-[93%]'>
              <div className='flex gap-6 justify-start items-center'><SparklesIcon className='text-blue-700' size={30}/> 
                  <p className='text-2xl text-gray-700 font-bold max-sm:text-[20px]'>Object Removal</p></div>
                  <form>
                  <p  className='mt-8 text-[18px] font-medium text-gray-700'>Upload image</p>
                     <input type="file"  className='w-[99%] h-12 rounded border-[1px] border-gray-400 mt-3 ml-[0.5%] p-2.5
                     font-medium text-gray-500 pl-3.5' required
                     accept="image/*" onChange={setf}
                     />
                   <p  className='mt-8 text-[18px] font-medium text-gray-700'>Describe object name to remove</p>
                  <textarea   className='w-[99%] h-28 rounded border-[1px] border-gray-400 mt-3 ml-[0.5%] 
                  font-medium text-gray-500 pl-3.5 pt-2' 
                  placeholder='eg., watch or spoon, Only single object name' required
                  onChange={(e) => setprompt(e.target.value)}
                  ></textarea>
                     <button className='flex gap-2 mt-7 w-[99%] ml-[0.5%] justify-center py-3.5 rounded text-white
                     font-medium bg-gradient-to-r from-[#417DF6] to-[#8E37EB]
                     '
                     onClick={submit}
                     ><ScissorsIcon className='text-white'/> <p id='p1'>Remove Object</p></button>
                     </form>
             </div>
             
              <div className={`bg-white shadow rounded p-5.5 w-[600px] max-lg:w-[93%] 
                ${content.length === 0 ? 'h-[455px]' : 'h-auto'}
                `}>
                  <div className='flex gap-6 justify-start items-center'><ScissorsIcon className='text-blue-700' size={30}/> 
                    <p className='text-2xl text-gray-700 font-bold max-sm:text-[20px]'>Processed Image</p></div>
                    <div className={`w-full  mt-3 
                      ${content.length === 0 ? 'h-[365px]' : 'h-auto'}
                      `}>
                         {content.length === 0 ? <>
                         <div className='w-full h-full pt-28'>
                         <ScissorsIcon className=' text-gray-400 text-center w-full' size={40}/>
                         <p className='text-gray-400 text-center font-medium mt-6'>Upload an image and click "Remove Object" to get started</p>
                        </div>
                         </>
                          : 
                          <>
                           <img src={url} alt="" className='w-full h-full rounded' />
                           </>
                         }
                    </div>
                 </div>
           </div>
           
        </div>
  )
}

export default Object
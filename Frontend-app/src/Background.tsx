import React, { useState, useEffect } from 'react'
import {  EraserIcon, SparklesIcon} from 'lucide-react'
import {useUser  } from '@clerk/clerk-react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie';
type arr2 = {
  type: string
  image: {
    url: string,
    public_id: string,
    secure_url: string
  }
}


const Background = () => {
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
    const[file, setfile] = useState<File | null>(null);
    const[url, seturl] = useState<string>("");
    console.log(url);
     function chfile(e: React.ChangeEvent<HTMLInputElement>){
            if(e.target.files && e.target.files.length > 0){
              setfile(e.target.files[0]);
            }
      }
    async function submit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
      e.preventDefault();
       if(file === null){
               toast.error("Please select a file");
               return;
        }
        try{
           const name = Cookies.get('name');
           if(plan !== "Premium"){
                 toast("Please select a premium plan");
                 return;
            }
           p1.innerHTML = "Removing Background...";
           const formdata: FormData = new FormData();
           if(name !== undefined){
            formdata.append("name", name);
            formdata.append("image", file);
            formdata.append("type", "Background");
           }
           const submit = await axios.post('http://localhost:8081/removebg' , formdata, {
             headers:{
               "Content-Type": "multipart/form-data",
            },
           });

           if(submit.data.success === true){
            setcontent([submit.data.data])
            seturl(submit.data.data.image.url);
            toast.success("Your background removed image generated");
           }
           else{
            toast.error(submit.data.message);
           }
        }
        catch(err: unknown){
          toast.error(err as string)
        }
        finally{
          p1.innerHTML = "Remove Background";
        }
    }
  return (
    <div className='w-[79%] bg-blue-50 max-md:w-full pt-26 pl-[2%] max-sm:pl-[6%] overflow-y-scroll  pb-3'>
       <div className='flex flex-wrap gap-3'>
         <div className='bg-white shadow rounded p-5.5 w-[600px] max-lg:w-[93%]'>
          <div className='flex gap-6 justify-start items-center'><SparklesIcon className='text-orange-700' size={30}/> 
              <p className='text-2xl text-gray-700 font-bold max-sm:text-[20px]'>Background Removal</p></div>
              <form>
              <p  className='mt-8 text-[18px] font-medium text-gray-700'>Upload image</p>
                 <input type="file"  className='w-[99%] h-12 rounded border-[1px] border-gray-400 mt-3 ml-[0.5%] p-2.5
                 font-medium text-gray-500 pl-3.5'
                 accept="image/*" required
                 onChange={chfile}
                 />
                 <p className=' text-[14px] font-medium text-gray-400 mt-1'>Supports JPG, PNG, and other image formats</p>
                 <button className='flex gap-2 mt-7 w-[99%] ml-[0.5%] justify-center py-3.5 rounded text-white
                 font-medium bg-gradient-to-r from-orange-400 to-orange-700
                 '
                 onClick={submit}
                 ><EraserIcon className='text-white'/> <p id='p1'> Remove Background</p></button>
                 </form>
         </div>
          <div className={`bg-white shadow rounded p-5.5 w-[600px] max-lg:w-[93%] 
            ${content.length === 0 ? 'h-[455px]' : 'h-auto'}
            `}>
              <div className='flex gap-6 justify-start items-center'><EraserIcon className='text-orange-700' size={30}/> 
                <p className='text-2xl text-gray-700 font-bold max-sm:text-[20px]'>Processed Image</p></div>
                <div className={`w-full  mt-3 
                  ${content.length === 0 ? 'h-[365px]' : 'h-auto'}
                  `}>
                     {content.length === 0 ? <>
                     <div className='w-full h-full pt-28'>
                     <EraserIcon className=' text-gray-400 text-center w-full' size={40}/>
                     <p className='text-gray-400 text-center font-medium mt-6'>Upload an image and click "Remove Background" to get started</p>
                    </div>
                     </>
                      : 
                      <>
                        <img src={url} alt="" className='h-full w-full rounded'/>
                     </>
                     }
                </div>
             </div>
       </div>
       
    </div>
  )
}

export default Background
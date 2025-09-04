import React, { useState, useEffect } from 'react'
import { PaperclipIcon, SparklesIcon} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {useUser} from '@clerk/clerk-react'
import { type NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Markdown from 'react-markdown'
import Cookies from 'js-cookie'
type arr2 = {
  type: string
  res: string,
  prompt: string
}

const Resume = () => {

  const navigate: NavigateFunction = useNavigate();
  const[file, setfile] = useState<File | null>(null)
  const[content, setcontent] = useState<Array<arr2>>([]);
  const p1 = document.getElementById("p1") as HTMLInputElement;
  const plan = Cookies.get('plan')
  console.log(p1);
      const { user } = useUser();
     useEffect(() => {
           const check = Cookies.get('name');
           if(check === undefined){
             navigate("/");
             toast.error("Please Signup or Signin to continue");
           }
      }, [])  
  function setf(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files.length > 0){
      const file = e.target.files[0]
       if(file.size < 5 * 1024 * 1024){
       
        setfile(file);
      }
      else{
        toast.error("Please select file which have size below 5 mb")
      }
    }
   
  }
  async function submit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
    e.preventDefault();
    if(!file){
        toast.error("Please select a file");
        return
      }
    try{
      const name = Cookies.get('name');
      if(name === undefined){ return }
      if(plan !== "Premium"){
            toast("Please select a premium plan");
            return;
      }
      const formdata: FormData = new FormData();
      formdata.append("resume", file)
      formdata.append("name", name)
      formdata.append("type", "Resume");
      p1.innerHTML = "Reviewing Resume..."
      const submit = await axios.post('http://localhost:8081/reviewresume' , formdata, {
             headers:{
               "Content-Type": "multipart/form-data",
            },
      });
      if(submit.data.success === true){
        setcontent([submit.data.data]);
        toast.success("The review of your resume is generated");
      }
      else{
        toast.error(submit.data.message);
      }
    }
    catch(err: unknown){
      toast.error(err as string)
    }
    finally{
      p1.innerHTML = "Review Resume";
    }
  }
  return (
    <div className='w-[79%] bg-blue-50 max-md:w-full pt-26 pl-[2%] max-sm:pl-[6%] overflow-y-scroll  pb-3'>
              <div className='flex flex-wrap gap-3'>
                <div className='bg-white shadow rounded p-5.5 w-[600px] max-lg:w-[93%]'>
                 <div className='flex gap-6 justify-start items-center'><SparklesIcon className='text-green-500' size={30}/> 
                     <p className='text-2xl text-gray-700 font-bold max-sm:text-[20px]'>Resume Review</p></div>
                     <form>
                     <p  className='mt-8 text-[18px] font-medium text-gray-700'>Upload Resume</p>
                        <input type="file"  className='w-[99%] h-12 rounded border-[1px] border-gray-400 mt-3 ml-[0.5%] p-2.5
                        font-medium text-gray-500 pl-3.5' required
                        accept=".pdf" 
                        onChange={setf}
                        />
                         <p className=' text-[14px] font-medium text-gray-400 mt-1'>Supports PDF resume only.</p>
                        <button className='flex gap-2 mt-7 w-[99%] ml-[0.5%] justify-center py-3.5 rounded text-white
                        font-medium bg-gradient-to-r from-green-400 to-[#009BB3]
                        ' onClick={submit}><PaperclipIcon className='text-white'/> <p id ='p1'>Review Resume</p></button>
                        </form>
                </div>
                
                 <div className={`bg-white shadow rounded p-5.5 w-[600px] max-lg:w-[93%]  
                  ${content.length === 0 ? 'h-[455px]' : 'h-[555px]'}
                  `}>
                     <div className='flex gap-6 justify-start items-center'><PaperclipIcon className='text-green-500' size={30}/> 
                       <p className='text-2xl text-gray-700 font-bold max-sm:text-[20px]'>Analysis Results</p></div>
                       <div className={`w-full  mt-3 ${content.length === 0 ? 'h-[365px]' : 'h-[465px] overflow-y-scroll'}`}>
                            {content.length === 0 ? <>
                            <div className='w-full h-full pt-28'>
                            <PaperclipIcon className=' text-gray-400 text-center w-full' size={40}/>
                            <p className='text-gray-400 text-center font-medium mt-6'>Upload a resume and click "Review Resume" to get started</p>
                           </div>
                            </>
                             : <div className='reset-tw'>
                              <Markdown>
                                 {content[0].res}
                              </Markdown>
                             </div>
                            }
                       </div>
                    </div>
              </div>
              
           </div>
  )
}

export default Resume
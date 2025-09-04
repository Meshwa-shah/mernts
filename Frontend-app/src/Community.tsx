import React, {useState, useEffect} from 'react'
import { Heart } from 'lucide-react'
import {toast} from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate, type NavigateFunction } from 'react-router-dom'
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
  _id: string,
  __v: number
}


const Community = () => {
  const[content, setcontent] = useState<Array<arr2>>([]);
  const[loading, setloading] = useState<boolean>(false);
  const[disabled, setdisabled] = useState<boolean>(false);
  const name = Cookies.get('name');
  const navigate: NavigateFunction = useNavigate();
   useEffect(() => {
     const check = Cookies.get('name');
  if(check === undefined){
     navigate("/");
     toast.error("Please Signup or Signin to continue");
  }
  else{
     async function fetch() {

      try{
        setloading(true)
         const img = await axios.get(`http://localhost:8081/findimg`);
         if(img.data.success === true){
            setcontent([...img.data.data]);
         }
         else{
          toast.error(img.data.message);
         }
      }
      catch(err: unknown){
         toast.error(err as string);
      }
      finally{
        setloading(false);
      }
     }

     fetch();
    }
   }, [])
  
   async function like(id: string): Promise<void>{
    console.log('hh')
    try{
      setdisabled(true);
      const inc = await axios.post('http://localhost:8081/likes', {
          name: name,
          id: id
       });

       if(inc.data.success === true){
        toast.success(inc.data.message);
        setcontent([...inc.data.data])
       }
       else{
        toast.error(inc.data.message);
       }
    }
    catch(err: unknown){
      toast.error(err as string)
    }
    finally{
      setdisabled(false)
    }
   }

   async function dislike(id: string): Promise<void>{
    console.log('hh')
    try{
      setdisabled(true);
      const dec = await axios.post('http://localhost:8081/dislike', {
          name: name,
          id: id
       });

       if(dec.data.success === true){
        toast.success(dec.data.message);
        setcontent([...dec.data.data])
       }
       else{
        toast.error(dec.data.message);
       }
    }
    catch(err: unknown){
      toast.error(err as string)
    }
    finally{
      setdisabled(false)
    }
   }

  return (
      <div className='w-[79%] bg-blue-50 max-md:w-full pt-19 pl-5  overflow-y-scroll pb-4 pr-5' >
             <p className='text-[19px] text-black mt-8 font-medium'>Creations</p> 
             {loading ? <><p className='text-fuchsia-500 text-2xl text-center mt-[5%]'>Loading...</p></> : <>
             <div className='  rounded-2xl p-4 mt-5.5 flex flex-wrap gap-4   '>
              {content.map((el, i) => {
                    return <div key={i} className='w-[377px] h-[377px]  [@media(max-width:447px)]:h-[320px] relative group'>
                      <img src={el.image.url} alt="" className='w-full h-full rounded-2xl '/>
                      <div className='flex absolute bottom-5 right-8 justify-center items-center gap-3 backdrop-blur-lg p-[2px] px-3 rounded-2xl z-20'>
                      <p className='text-[27.5px]  text-white font-light'>{el.likes}</p>
                      <button className='' disabled={disabled}
                      onClick={el.likedby.includes(String(name)) ? () => dislike(el._id) : () => like(el._id)}
                      ><Heart color={el.likedby.includes(String(name)) ? 'red': 'white'} fill={el.likedby.includes(String(name)) ? 'red': 'white'}/></button>
                      </div>
                      <div className='pl-5 w-full bg-black text-white text-left absolute z-10 bottom-0 py-10 opacity-0 group-hover:opacity-[0.8] rounded-b-2xl
                      transition-opacity
                      '>{el.prompt}</div>
                    </div>
              })}
             </div>
             </>}
      </div>
  )
}

export default Community
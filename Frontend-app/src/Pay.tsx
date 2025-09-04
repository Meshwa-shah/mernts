import React, { useEffect, useState } from 'react'
import { PricingTable } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react'
import {toast} from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie';
const Pay: React.FC = () => {
   const { has, isLoaded } = useAuth();
   const hasPremiumAccess = has?.({ plan: 'Free'});
   const[plan, setplan] = useState<string>('');
   
  console.log(plan)
   useEffect(() => {
       async function find(){
        const name = Cookies.get('name')
        console.log(name);
           try{
            const upd = await axios.post('http://localhost:8081/setplan', {
                name: name
            });

            if(upd.data.success === true){
                setplan(upd.data.data[0].plan)
               Cookies.set('plan', 'Premium')
            }
            else{
                toast.error(upd.data.message);
            }
           }

           catch(err: unknown){
            toast.error(err as string)
           }
       }

       find();
   }, [])
   async function change(){
     const name = Cookies.get('name')

     try{
             if(plan === 'Premium'){
                toast.error('You already have premium plan');
                return
             }
             if(name === undefined){
                toast.error('Please login to continue');
                return
             }
             if(window.confirm("Are you sure you want to pay 16$ ?")){
             const submit = await axios.post('http://localhost:8081/plan', {
                name: name
             });

             if(submit.data.success === true){
                toast.success(submit.data.message);
                setplan(submit.data.data.plan);
             }
             else{
                toast.success(submit.data.success);
             }
            }
        }
    catch(err : unknown){
          toast.error(err as string)
        }
   }

  return (
    <div className='w-full mt-28 max-sm:mt-20'>
    <p className='text-center text-6xl text-gray-600 font-bold max-sm:text-4xl'>Choose Your Plan</p>
    <p className='text-center text-[19px] text-gray-600 font-bold mt-7 max-sm:text-[10px]'>Start for free and scale up as you grow. Find the perfect plan for your <br/>content creation needs.</p>
    <div className='w-full mt-14 flex justify-center items-center gap-8 flex-wrap'>
     <div className="max-w-80 overflow-hidden rounded-lg shadow">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
                <h3 className="text-xl font-bold">Free</h3>
                <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="ml-1">/month</span>
                </div>
            </div>
            <div className="bg-white p-6">
                <p className="mb-6 text-gray-600">Everything you need for advanced projects and teams.</p>
                <ul className="mb-6 space-y-1 text-sm text-gray-500">
                    <li className="flex items-start">
                        <svg className="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Blog Article Generation</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Blog Title Generation</span>
                    </li>
                    <li className="flex items-start">
                     <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 mr-2 h-5 w-5 text-purple-500"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
    
                        <span>Image Generation</span>
                    </li>
                    <li className="flex items-start">
                     
                         <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 mr-2 h-5 w-5 text-purple-500"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            
                        <span>Background Removing</span>
                    </li>
                    <li className="flex items-start">
                       
                                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 mr-2 h-5 w-5 text-purple-500"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            
                        <span>Object Removing</span>
                    </li>
                    <li className="flex items-start">
                     
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 mr-2 h-5 w-5 text-purple-500"
                                    strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                        <span>Resume Review</span>
                    </li>
                </ul>
                <button className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-sm text-white transition-opacity hover:opacity-90">Free</button>
            </div>
        </div>
     <div className="max-w-80 overflow-hidden rounded-lg shadow">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
                <h3 className="text-xl font-bold">Premium</h3>
                <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">$16</span>
                    <span className="ml-1">/month</span>
                </div>
            </div>
            <div className="bg-white p-6">
                <p className="mb-6 text-gray-600">Everything you need for advanced projects and teams.</p>
                <ul className="mb-6 space-y-1 text-sm text-gray-500">
                    <li className="flex items-start">
                        <svg className="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Blog Article Generation</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Blog Title Generation</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Image Generation</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Background Removing</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Object Removing</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="mt-0.5 mr-2 h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Resume Review</span>
                    </li>
                </ul>
                <button className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
                onClick={change}
                >{plan === "Premium" ? 'Premium' : 'Get Premium'}</button>
            </div>
        </div>
     </div>  
    </div>
  )
}

export default Pay
import React from "react";
import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
     const p1 = document.getElementById('p1') as HTMLInputElement;
    const [state, setState] = useState<string>("login");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [img, setimg] = useState<File | null>(null);
      const navigate: NavigateFunction = useNavigate();
    function setf(e: React.ChangeEvent<HTMLInputElement>){
         if(e.target.files && e.target.files.length > 0){
            setimg(e.target.files[0]);
         }
    }
    async function submit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
     e.preventDefault();
     try{
      const find = await axios.post('http://localhost:8081/log', {
            email: email,
            password: password
        });
         if(find.data.success === true){
            toast.success(`Welcome user ${find.data.user.name}`)
            Cookies.set('name', find.data.user.name);
            Cookies.set('profile', find.data.user.profile)
            navigate('/')
         }
         else{
            toast.error(find.data.message);
         }
      }
     
     catch(err: unknown){
        toast.error(err as string);
     }
    }
    async function check(e: React.FormEvent<HTMLFormElement>): Promise<void>{
        e.preventDefault();
        try{
        if(!img){
            toast.error("Please select an image")
            return
        }
             
             console.log("HH")
             p1.innerHTML = "Creating Account...";
            const formdata: FormData = new FormData();
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("image", img);
             const submit = await axios.post('http://localhost:8081/adduser' , formdata, {
             headers:{
               "Content-Type": "multipart/form-data",
            },
        
        })
           ;

           if(submit.data.success === true){
            toast.success(`Welcome new user ${submit.data.user.name}`);
            Cookies.set('name', submit.data.user.name);
            Cookies.set('profile', submit.data.user.profile);
            navigate('/')
           }
           else{
            toast.error(submit.data.message);
           }
        }
         catch(err: unknown){
        toast.error(err as string);
     }
     finally{
        p1.innerHTML = "Create Account";
     }
    }
    return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <form className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
             {state === "register" && (
                <div className="w-full">
                    <p>Image</p>
                    <input onChange={setf}  placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="file" required 
                    accept="image/*"
                    />
                </div>
            )}
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            )}
            <button onClick={state === "login" ? submit : check} className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
            id="p1"
            >
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    </div>
    );
};

export default Login
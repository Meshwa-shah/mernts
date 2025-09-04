
import { Route, Routes, useFetcher } from 'react-router-dom'
import Home from './Home'
import './App.css'
import type React from 'react'
import Dashboard from './Dashboard'
import Write from './Write'
import Resume from './Resume'
import Images from './Images'
import Background from './Background'
import Title from './Title'
import Object from './Object'
import Community from './Community'
import Dmain from './Dmain'
import Login from './Login'
import { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
const App: React.FC = () => {
  

  return (

    <div className='m-0 p-0 box-border'>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route element={<Dmain/>}>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/Write' element={<Write/>}/>
        <Route path='/Titles' element={<Title/>}/>
        <Route path='/Images' element={<Images/>}/>
        <Route path='/Background' element={<Background/>}/>
        <Route path='/Object' element={<Object/>}/>
        <Route path='/Resume' element={<Resume/>}/>
        <Route path='/Community' element={<Community/>}/>
        </Route>
       </Routes>
      </div>
     

  )
}

export default App

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './Context.tsx'
import { ToastContainer, toast } from 'react-toastify';
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')!).render(
  
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <AppContextProvider>
      <BrowserRouter>
       <App />
       <ToastContainer
    position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
    />
      </BrowserRouter>
    </AppContextProvider>
    </ClerkProvider>

)
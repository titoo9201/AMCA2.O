import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Usercontext from './context/usercontext.jsx'



createRoot(document.getElementById('root')).render(
  <Usercontext>

    <App />
  
    
  </Usercontext>,
)

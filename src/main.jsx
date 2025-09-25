import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Signup from './Signup.jsx';
import Dashboard from './Dashboard.jsx';
import { ToastContainer, toast } from 'react-toastify';
const router = createBrowserRouter([
  {
    path:"/",
    element:<Signup/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer/>
    <RouterProvider router = {router}/>

  </StrictMode>,
)

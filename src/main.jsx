import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CameraComponent from './AppPro.jsx'
import Enroll from './Enroll.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="navbar bg-info text-primary-content">
        <button className="btn btn-ghost text-xl">Smart Attendance Manager</button>
    </div>
    {/* <App /> */}
    {/* <CameraComponent/> */}
    <Enroll/>
  </StrictMode>,
)

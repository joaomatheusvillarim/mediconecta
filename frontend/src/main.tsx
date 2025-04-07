import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LoginPage from './pages/LoginPage/index.tsx'
import RegisterPage from './pages/RegisterPage/index.tsx'
import Dashboard from './pages/Dashboard/index.tsx'
import CreateClinicPage from './pages/CreateClinicPage/index.tsx'
import ClinicProfile from './pages/ClinicProfile/index.tsx'
import DoctorPage from './pages/DoctorPage/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

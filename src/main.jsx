import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './views/Home.jsx'
import './index.css'
import { Router } from './router/Router.jsx'
import { AuthProvider} from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <Router />
    </AuthProvider>
  </StrictMode>,
)

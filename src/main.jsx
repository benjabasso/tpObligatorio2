import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './views/Home.jsx'
import './index.css'
import { Router } from './router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)

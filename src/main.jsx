import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='513890880200-rqngsn1tusv3tleo2e1car7pu3gl1lai.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
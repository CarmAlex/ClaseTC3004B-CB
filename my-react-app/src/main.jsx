import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Hola from './Hola.tsx'
import Variables from './Variables.tsx'
import Bancos from './Bancos.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hola />
    <div></div>
    <Variables />
    <div></div>
    <Bancos />
  </StrictMode>,
)

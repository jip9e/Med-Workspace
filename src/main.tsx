import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { VisionProvider } from './components/VisionProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VisionProvider>
      <App />
    </VisionProvider>
  </StrictMode>,
)

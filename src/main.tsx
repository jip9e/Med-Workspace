import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/figtree'
import '@fontsource/figtree/400.css'
import '@fontsource/figtree/700.css'
import '@fontsource/noto-sans'
import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/700.css'
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

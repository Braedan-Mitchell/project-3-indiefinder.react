import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/base.css'
import App from './App.jsx'
import { AppDataProvider } from './context/AppDataContext.jsx'
import { UiSettingsProvider } from './context/UiSettingsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UiSettingsProvider>
      <AppDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppDataProvider>
    </UiSettingsProvider>
  </StrictMode>
)

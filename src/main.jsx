import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { AudioProvider } from './context/AudioContext'
import { AchievementProvider } from './context/AchievementContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AudioProvider>
        <AchievementProvider>
          <App />
        </AchievementProvider>
      </AudioProvider>
    </ThemeProvider>
  </StrictMode>,
)

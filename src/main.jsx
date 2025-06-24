import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { GetRandomMoviesFromNoco } from './functions/nocodbFunctions.js'
import { BrowserRouter } from 'react-router-dom'

// GetRandomMoviesFromNoco(20);

createRoot(document.getElementById('root')).render(
    <BrowserRouter basename="/OpenReel">
      <App />
    </BrowserRouter>
)

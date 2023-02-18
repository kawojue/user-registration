import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './hooks/Context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<App />}/>
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
)

import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { DataProvider } from './Context'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<App/>}/>
        </Routes>
      </Router>
    </DataProvider>
  </React.StrictMode>
)

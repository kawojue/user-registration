import './index.css'
import App from './App'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from './hooks/useContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<App />}/>
        </Routes>
      </Router>
    </UserProvider>
  </>
)

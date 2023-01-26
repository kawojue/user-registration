import Login from "./components/Login"
import Register from "./components/Register"
import { Routes, Route } from "react-router-dom"
import { RegisterProvider } from "./hooks/RegisterContext"

const App: React.FC = () => {
  return (
  <main className="container">
    <Routes>
        <Route index element={
          <RegisterProvider>
            <Register/>
          </RegisterProvider>
        } />
      <Route path="/login" element={<Login />} />
    </Routes>
  </main>
  )
}

export default App
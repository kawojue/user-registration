import Home from "./components/Home"
import Login from "./components/Login"
import Layout from "./components/Layout"
import Register from "./components/Register"
import { Routes, Route } from "react-router-dom"

const App: React.FC = () => {
  return (
    <>
    <Routes>
      <Route index element={<Home />}/>
      <Route element={<Layout />}>
        <Route path="/auth/signup" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
      </Route>
    </Routes>
  </>
  )
}

export default App
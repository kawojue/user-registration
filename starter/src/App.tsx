import Home from "./components/Home"
import Login from "./components/Login"
import Layout from "./components/Layout"
import Missing from "./components/Missing"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import { Routes, Route } from "react-router-dom"

const App: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path="/:id" element={<Dashboard />} />
      <Route path="/" element={<Layout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Register />} />

        <Route index element={<Home />}/>
        <Route path="*" element={<Missing />}/>
      </Route>
    </Routes>
  </>
  )
}

export default App
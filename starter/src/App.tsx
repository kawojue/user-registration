import Home from "./components/Home"
import Admin from "./components/Admin"
import Login from "./components/Login"
import Layout from "./components/Layout"
import Lounge from "./components/Lounge"
import Editor from "./components/Editor"
import Missing from "./components/Missing"
import Register from "./components/Register"
import LinkPage from "./components/LinkPage"
import Dashboard from "./components/Dashboard"
import { Routes, Route } from "react-router-dom"
import ForgotPswd from "./components/ForgotPswd"
import RequireAuth from "./components/RequireAuth"
import Unauthorized from "./components/Unauthorized"

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="profile/:id" element={<Dashboard />} />
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path="*" element={<Missing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/linkpage" element={<LinkPage />} />
          <Route path="/auth/signup" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/account/password/reset" element={<ForgotPswd />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route index element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/lounge" element={<Lounge />} />
            <Route path="/lounge" element={<Lounge />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
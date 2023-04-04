import Home from "./components/Home"
import Admin from "./components/Admin"
import Login from "./components/Login"
import Layout from "./components/Layout"
import Lounge from "./components/Lounge"
import Employee from "./components/Employee"
import userContext from "./hooks/useContext"
import Missing from "./components/Missing"
import Register from "./components/Register"
import LinkPage from "./components/LinkPage"
import Dashboard from "./components/Dashboard"
import { Routes, Route } from "react-router-dom"
import ForgotPswd from "./components/ForgotPswd"
import RequireUser from "./components/RequireUser"
import UseNavigate from "./components/UseNavigate"
import Unauthorized from "./components/Unauthorized"

const App: React.FC = () => {
  const { auth }: any = userContext()

  return (
    <>
      <Routes>
        <Route path="profile/:id" element={<Dashboard />} />
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path="*" element={<Missing />} />
          <Route path="/auth/login"
          element={auth?.username && auth?.accessToken ?
          <UseNavigate /> : <Login />} />
          <Route path="/linkpage" element={<LinkPage />} />
          <Route path="/auth/signup"
          element={auth?.username && auth?.accessToken ?
          <UseNavigate /> :<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/account/password/reset" element={<ForgotPswd />} />

          {/* Protected routes */}
          <Route element={<RequireUser allowedRoles={[9823]} />}>
            <Route index element={<Home />} />
          </Route>

          <Route element={<RequireUser allowedRoles={[4589]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route element={<RequireUser allowedRoles={[2384]} />}>
            <Route path="/employee" element={<Employee />} />
          </Route>

          <Route element={<RequireUser allowedRoles={[4589, 2384]} />}>
            <Route path="/lounge" element={<Lounge />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
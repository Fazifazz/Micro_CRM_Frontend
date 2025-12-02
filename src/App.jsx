import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Home from './pages/Home'
import Contacts from './pages/Contacts'
import IsLoggedOutUser from './middlewares/IsUserLoggedOut'
import ErrorPage from './pages/ErrorPage'
import IsLoggedUser from './middlewares/IsUserLoggedIn'
import Users from './pages/Users'
import AppLayout from './pages/AppLayout'
import IsAdmin from './middlewares/IsAdmin'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<IsLoggedOutUser />}>
            <Route path={'/login'} element={<Login />} />
          </Route>

          <Route element={<IsLoggedUser />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/contacts" element={<Contacts />} />
            </Route>
          </Route>
          <Route element={<IsAdmin />}>
            <Route element={<AppLayout />}>
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>

          {/* 404 error page  */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

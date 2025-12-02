import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext, AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Home from './pages/Home'
import Contacts from './pages/Contacts'
import IsLoggedOutUser from './middlewares/IsUserLoggedOut'
import ErrorPage from './pages/ErrorPage'
import IsLoggedUser from './middlewares/IsUserLoggedIn'
import Users from './pages/Users'
import { useContext, useEffect } from 'react'
import { getLoginedUser } from './api/authService'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/login'} element={<Login />} />

          <Route element={<IsLoggedOutUser />}>
            <Route path={'/login'} element={<Login />} />
          </Route>

          <Route element={<IsLoggedUser />}>
            <Route path={'/'} element={<Home />} />
            <Route path={'/contacts'} element={<Contacts />} />
            <Route path={'/users'} element={<Users />} />
          </Route>

          {/* 404 error page  */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

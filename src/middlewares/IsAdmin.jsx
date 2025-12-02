import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

function IsAdmin() {
  const { user } = useContext(AuthContext)
  const token = sessionStorage.getItem('token')
  return token && user?.role === 'admin' ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={'/'} />
  )
}

export default IsAdmin

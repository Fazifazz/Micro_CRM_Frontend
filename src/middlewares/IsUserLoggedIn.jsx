import { Navigate, Outlet } from 'react-router-dom'

function IsLoggedUser() {
  const token = sessionStorage.getItem('token')
  return token ? <Outlet /> : <Navigate to={'/login'} />
}

export default IsLoggedUser

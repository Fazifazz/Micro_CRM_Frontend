import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
function IsLoggedOutUser() {
  const token = sessionStorage.getItem('token')
  return !token ? <Outlet /> : <Navigate to={'/'} />
}

export default IsLoggedOutUser

import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getLoginedUser } from '../api/authService'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  const { user, loadUser } = useContext(AuthContext)

  useEffect(() => {
    if (user) return

    const token = sessionStorage.getItem('token')
    if (!token) return

    getLoginedUser()
      .then((u) => loadUser(u?.data))
      .catch(() => loadUser(null))

  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}
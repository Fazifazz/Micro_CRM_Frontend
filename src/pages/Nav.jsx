import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getLoginedUser } from '../api/authService'

const Nav = () => {
  const loadUser = useContext(AuthContext)

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token')
      if (!token) return

      try {
        const user = await getLoginedUser()
        loadUser(user)
      } catch (error) {
        loadUser(null)
      }
    }

    fetchUser()
  }, [loadUser])
  return <div></div>
}

export default Nav

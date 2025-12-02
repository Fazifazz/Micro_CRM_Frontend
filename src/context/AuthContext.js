import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const loadUser = async (user) => {
    try {
      setUser(user)
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      loadUser()
    }
  }, [])

  const loginUser = (token, user) => {
    sessionStorage.setItem('token', token)
    loadUser(user)
  }

  const logoutUser = () => {
    sessionStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loadUser }}>
      {children}
    </AuthContext.Provider>
  )
}

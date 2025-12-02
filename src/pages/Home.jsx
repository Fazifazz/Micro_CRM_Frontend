import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/login')
    logoutUser()
  }
  return (
    <div style={{ padding: 50 }}>
      <h2>Welcome {user?.email}</h2>
      <button onClick={() => navigate('/contacts')}>go to Contacts</button>
      {user?.role === 'admin' && <button onClick={() => navigate('/users')}>go to Users</button>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

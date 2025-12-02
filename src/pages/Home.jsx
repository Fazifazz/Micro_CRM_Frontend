import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
  const { user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <h2>Welcome 👋</h2>
        <p className="welcome">{user?.email}</p>

        <div className="btn-group">
          <button onClick={() => navigate('/contacts')} className="btn primary">
            Contacts
          </button>

          {user?.role === 'admin' && (
            <button onClick={() => navigate('/users')} className="btn primary">
              Users
            </button>
          )}

          <button onClick={handleLogout} className="btn danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

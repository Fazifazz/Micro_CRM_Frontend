import React, { useEffect, useState } from 'react'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../api/userservice'
import { useNavigate } from 'react-router-dom'
import '../styles/Master.css'

const Users = () => {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  })
  const [editingId, setEditingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    await getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    e.preventDefault()

    if (!form.name) return alert('Name is required')

    if (editingId) {
      await updateUser(editingId, form)
      setEditingId(null)
    } else {
      await createUser(form)
    }

    setForm({ name: '', email: '', password: '', role: '' })
    fetchUsers()
  }

  const handleEdit = async (c) => {
    const res = await getUser(c.id)
    setForm(res?.data)
    setEditingId(c.id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteUser(id)
      fetchUsers()
    }
  }

  return (
    <div className="contacts-container">
      <div className="contacts-card">
        <h2>Users</h2>

        <form onSubmit={submitForm} className="contacts-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          {!editingId && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          )}

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="select-input"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>

          <button className="btn primary" type="submit">
            {editingId ? 'Update User' : 'Add User'}
          </button>
        </form>

        <table className="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id}>
                <td>{u?.name}</td>
                <td>{u?.email}</td>
                <td>{u?.role}</td>
                <td>
                  <button
                    className="btn small edit"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn small delete"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn back" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default Users

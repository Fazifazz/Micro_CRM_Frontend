import React, { useEffect, useState } from 'react'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../api/userservice'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [editingId, setEditingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await getUsers()
    setUsers(res.data)
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

    setForm({ name: '', email: '', phone: '', notes: '' })
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
    <div style={{ padding: 20 }}>
      <h2>Users</h2>

      <form onSubmit={submitForm}>
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
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>

        <button type="submit">{editingId ? 'Update User' : 'Add User'}</button>
      </form>

      <hr />

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((c) => (
            <tr key={c.id}>
              <td>{c?.name}</td>
              <td>{c?.email}</td>
              <td>{c?.role}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate('/')}>Home</button>
    </div>
  )
}

export default Users

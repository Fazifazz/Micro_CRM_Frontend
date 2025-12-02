import React, { useEffect, useState } from 'react'
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from '../api/contactService'
import { useNavigate } from 'react-router-dom'
import '../styles/Master.css'

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [editingId, setEditingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const res = await getContacts()
    setContacts(res.data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    e.preventDefault()

    if (!form.name) return alert('Name is required')

    if (editingId) {
      await updateContact(editingId, form)
      setEditingId(null)
    } else {
      await createContact(form)
    }

    setForm({ name: '', email: '', phone: '', notes: '' })
    fetchContacts()
  }

  const handleEdit = async (c) => {
    const res = await getContact(c.id)
    setForm(res?.data)
    setEditingId(c.id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteContact(id)
      fetchContacts()
    }
  }

  return (
    <div className="contacts-container">
      <div className="contacts-card">
        <h2>Contacts</h2>

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
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
          />

          <button className="btn primary" type="submit">
            {editingId ? 'Update Contact' : 'Add Contact'}
          </button>
        </form>

        <table className="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((c) => (
              <tr key={c.id}>
                <td>{c?.name}</td>
                <td>{c?.email}</td>
                <td>{c?.phone}</td>
                <td>{c?.notes}</td>
                <td>
                  <button
                    className="btn small edit"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn small delete"
                    onClick={() => handleDelete(c.id)}
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

export default Contacts

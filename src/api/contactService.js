import { getAuthHeader } from './authService'
import api from './axionInstance'

// Get contacts for a user
export const getContacts = async () => {
  const res = await api.get(`api/contacts`, getAuthHeader())
  return res.data
}

// Create contact
export const createContact = async (data) => {
  const res = await api.post(`api/contacts`, data, getAuthHeader())
  return res.data
}

// Get contact
export const getContact = async (id) => {
  const res = await api.get(`api/contacts/${id}`, getAuthHeader())
  return res.data
}

// Update contact
export const updateContact = async (id, data) => {
  const res = await api.put(`api/contacts/${id}`, data, getAuthHeader())
  return res.data
}

// Delete contact
export const deleteContact = async (id) => {
  const res = await api.delete(`api/contacts/${id}`, getAuthHeader())
  return res.data
}

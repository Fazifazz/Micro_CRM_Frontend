import { getAuthHeader } from './authService'
import api from './axionInstance'

// Get users for a user
export const getUsers = async () => {
  const res = await api.get(`api/users`, getAuthHeader())
  return res.data
}

// Create contact
export const createUser = async (data) => {
  const res = await api.post(`api/users`, data, getAuthHeader())
  return res.data
}

// Get contact
export const getUser = async (id) => {
  const res = await api.get(`api/users/${id}`, getAuthHeader())
  return res.data
}

// Update contact
export const updateUser = async (id, data) => {
  const res = await api.put(`api/users/${id}`, data, getAuthHeader())
  return res.data
}

// Delete contact
export const deleteUser = async (id) => {
  const res = await api.delete(`api/users/${id}`, getAuthHeader())
  return res.data
}

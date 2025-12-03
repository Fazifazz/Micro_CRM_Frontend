import { getAuthHeader } from './authService'
import api from './axionInstance'

export const getUsers = async () => {
  const res = await api.get(`api/users`, getAuthHeader())
  return res.data
}

export const createUser = async (data) => {
  const res = await api.post(`api/users`, data, getAuthHeader())
  return res.data
}

export const getUser = async (id) => {
  const res = await api.get(`api/users/${id}`, getAuthHeader())
  return res.data
}

export const updateUser = async (id, data) => {
  const res = await api.put(`api/users/${id}`, data, getAuthHeader())
  return res.data
}

export const deleteUser = async (id) => {
  const res = await api.delete(`api/users/${id}`, getAuthHeader())
  return res.data
}

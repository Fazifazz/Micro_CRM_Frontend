import { getAuthHeader } from './authService'
import api from './axionInstance'

export const getContacts = async () => {
  const res = await api.get(`api/contacts`, getAuthHeader())
  return res.data
}

export const createContact = async (data) => {
  const res = await api.post(`api/contacts`, data, getAuthHeader())
  return res.data
}

export const getContact = async (id) => {
  const res = await api.get(`api/contacts/${id}`, getAuthHeader())
  return res.data
}

export const updateContact = async (id, data) => {
  const res = await api.put(`api/contacts/${id}`, data, getAuthHeader())
  return res.data
}

export const deleteContact = async (id) => {
  const res = await api.delete(`api/contacts/${id}`, getAuthHeader())
  return res.data
}

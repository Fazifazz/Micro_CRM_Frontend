import api from './axionInstance'

export const getAuthHeader = () => {
  const token = sessionStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const login = async (email, password) => {
  const res = await api.post('/api/auth/login', { email, password })
  return res.data
}

export const getLoginedUser = async () => {
  const res = await api.get(`api/auth/load/user`, getAuthHeader())
  return res.data
}

export const getContacts = async (userId) => {
  const res = await api.get(`api/contacts/${userId}`)
  return res.data
}

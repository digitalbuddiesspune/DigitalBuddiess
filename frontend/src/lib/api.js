const API_BASE = import.meta.env.VITE_API_URL || ''

function getToken() {
  return localStorage.getItem('adminToken')
}

export function setAuthToken(token) {
  if (token) localStorage.setItem('adminToken', token)
  else localStorage.removeItem('adminToken')
}

export function getAuthToken() {
  return getToken()
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  const token = getToken()

  if (token) headers.Authorization = `Bearer ${token}`
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }
  return data
}

export const api = {
  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request('/api/auth/me'),

  getPortfolio: () => request('/api/portfolio'),

  getPortfolioItem: (id) => request(`/api/portfolio/${id}`),

  createPortfolioItem: (formData) =>
    request('/api/portfolio', {
      method: 'POST',
      body: formData,
    }),

  updatePortfolioItem: (id, formData) =>
    request(`/api/portfolio/${id}`, {
      method: 'PUT',
      body: formData,
    }),

  deletePortfolioItem: (id) =>
    request(`/api/portfolio/${id}`, {
      method: 'DELETE',
    }),
}

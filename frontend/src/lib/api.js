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

  const contentType = response.headers.get('content-type') || ''
  const raw = await response.text()

  let data = {}
  if (raw) {
    try {
      data = JSON.parse(raw)
    } catch {
      if (!response.ok) {
        throw new Error('Request failed')
      }
      throw new Error(
        'API returned a non-JSON response. Check that VITE_API_URL points to the backend.'
      )
    }
  }

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  // Guard against HTML/SPA fallbacks accidentally treated as success.
  if (contentType.includes('text/html')) {
    throw new Error(
      'API returned HTML instead of JSON. Check that VITE_API_URL points to the backend.'
    )
  }

  return data
}

function asPortfolioList(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.items)) return data.items
  if (Array.isArray(data?.data)) return data.data
  return []
}

export const api = {
  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request('/api/auth/me'),

  getPortfolio: async () => asPortfolioList(await request('/api/portfolio')),

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

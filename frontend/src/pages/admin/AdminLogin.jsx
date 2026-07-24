import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { api, getAuthToken, setAuthToken } from '../../lib/api'

function AdminLogin() {
  const navigate = useNavigate()
  const existing = getAuthToken()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (existing) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await api.login(email.trim(), password)
      setAuthToken(data.token)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none" />
      <form
        onSubmit={onSubmit}
        className="relative z-10 w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-gray-400 text-sm mb-6">
          Sign in to manage portfolio uploads.
        </p>

        <label className="block text-sm text-gray-300 mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:border-orange-500"
          required
        />

        <label className="block text-sm text-gray-300 mb-2" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:border-orange-500"
          required
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-60 font-medium transition-colors"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin

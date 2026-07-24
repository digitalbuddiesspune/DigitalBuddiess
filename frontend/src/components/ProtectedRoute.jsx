import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { api, getAuthToken, setAuthToken } from '../lib/api'

function ProtectedRoute() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    let cancelled = false

    async function verify() {
      const token = getAuthToken()
      if (!token) {
        if (!cancelled) setStatus('unauthenticated')
        return
      }

      try {
        await api.me()
        if (!cancelled) setStatus('authenticated')
      } catch {
        setAuthToken(null)
        if (!cancelled) setStatus('unauthenticated')
      }
    }

    verify()
    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Checking session...
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute

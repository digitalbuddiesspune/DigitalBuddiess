import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { setAuthToken } from '../../lib/api'

function AdminLayout() {
  const navigate = useNavigate()

  const logout = () => {
    setAuthToken(null)
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="font-semibold text-orange-500">
              Digital Buddies
            </NavLink>
            <nav className="flex items-center gap-3 text-sm">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive ? 'text-orange-500' : 'text-gray-300 hover:text-white'
                }
              >
                Portfolio
              </NavLink>
              <NavLink to="/portfolio" className="text-gray-300 hover:text-white">
                View site
              </NavLink>
            </nav>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-orange-500 text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout

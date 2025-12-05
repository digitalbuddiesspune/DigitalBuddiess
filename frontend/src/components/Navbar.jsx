import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white text-xl font-bold">Digital Buddies</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? 'bg-orange-800 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-orange-800'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? 'bg-orange-800 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-orange-800'
                  }`
                }
              >
                Service
              </NavLink>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? 'bg-orange-800 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-orange-800'
                  }`
                }
              >
                About Us
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? 'bg-orange-800 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-orange-800'
                  }`
                }
              >
                Blog
              </NavLink>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? 'bg-orange-800 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-orange-800'
                  }`
                }
              >
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar



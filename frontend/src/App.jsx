import React, { useEffect } from 'react'
import Header from './pages/Header'
import Footer from './pages/Footer'
import { Outlet, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    // If not navigating to a specific service accordion anchor, scroll smoothly to top
    if (state?.selectedService === undefined || state?.selectedService === null) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [pathname, state])

  return null
}

function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Service from '../pages/Service'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import Portfolio from '../pages/Portfolio'
import PortfolioDetail from '../pages/PortfolioDetail'
import DataPrivacy from '../pages/DataPrivacy'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import TermsAndConditions from '../pages/TermsAndConditions'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminLayout from '../pages/admin/AdminLayout'
import AdminPortfolio from '../pages/admin/AdminPortfolio'
import ProtectedRoute from '../components/ProtectedRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="service" element={<Service />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:id" element={<PortfolioDetail />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="data-privacy" element={<DataPrivacy />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPortfolio />} />
        </Route>
      </Route>
    </>
  )
)

export default router

import React from 'react'
import { MapPin, Mail, Phone } from 'lucide-react'

function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background building image overlay - using a gradient to simulate the effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.3)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content - Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Left Section - About Our Company */}
          <div>
            {/* Logo */}
            <div className="mb-6">
              <img 
                src="https://res.cloudinary.com/dfhjtmvrz/image/upload/v1764914021/digital_buddiess_logo2_pfpmnw.png"
                alt="Digital Buddies Logo"
                className="h-16 w-auto"
              />
            </div>

            {/* About Our Company Section */}
            <h3 className="text-lg font-bold uppercase mb-3 relative pb-2">
              ABOUT OUR COMPANY
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-500"></span>
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Our sole purpose as a Digital Marketing Agency is to take your brand to the heights where your competitors can only think of reaching. You are the best brand, Glassberry will make it outstanding.
            </p>
          </div>

          {/* Middle Section - Explore */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold uppercase mb-3 relative pb-2 inline-block">
              Explore
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-500"></span>
            </h3>
            <ul className="space-y-3 mt-6">
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">About us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">Our Team</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">Our Projects</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">Contact</a>
              </li>
            </ul>
          </div>

          {/* Right Section - Contact */}
    <div>
            <h3 className="text-lg font-bold uppercase mb-3 relative pb-2 inline-block">
              Contact
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-500"></span>
            </h3>
            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-orange-500 mt-1 flex-shrink-0" size={18} />
                <p className="text-gray-300 text-sm leading-relaxed">
                  618, Gera's, Imperum Rise, Wipro Circle, Hinjewadi, Pune Pincode: 411057.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-orange-500 mt-1 flex-shrink-0" size={18} />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Central Ave, opp. Saini Travels, Gandhibagh, Nagpur, Maharashtra 440032
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-orange-500 mt-1 flex-shrink-0" size={18} />
                <a href="mailto:info@digitalbuddiess.in" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  info@digitalbuddiess.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - CTA and Phone Numbers */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-semibold">Have Any Project?</span>
              <span className="text-white">Let's Talk & Grow your Business</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="text-orange-500" size={18} />
                <a href="tel:+919766670916" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  +91 9766670916
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-orange-500" size={18} />
                <a href="tel:+919404085316" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  +91 94040 85316
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-orange-500" size={18} />
                <a href="tel:+919545871746" className="text-gray-300 hover:text-orange-500 transition-colors text-sm">
                  +91 95458 71746
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © Copyright 2024 by digitalbuddies.in
            </p>
          </div>
        </div>
    </div>
    </footer>
  )
}

export default Footer

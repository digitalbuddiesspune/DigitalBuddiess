import React from 'react'

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about Digital Buddies and our mission to empower businesses
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              Digital Buddies was founded with a simple yet powerful vision: to help businesses
              navigate the digital landscape and achieve their full potential. We believe that
              every business, regardless of size, deserves access to world-class digital solutions.
            </p>
            <p>
              Since our inception, we've been committed to delivering innovative, reliable, and
              scalable digital services. Our team of experienced professionals brings together
              expertise in web development, mobile applications, digital marketing, and cloud
              solutions.
            </p>
            <p>
              We pride ourselves on building long-term partnerships with our clients, understanding
              their unique challenges, and providing tailored solutions that drive real results.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-orange-800 text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To empower businesses with cutting-edge digital solutions that drive growth and innovation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-orange-800 text-4xl mb-4">👁️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading digital transformation partner for businesses worldwide.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-orange-800 text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
            <p className="text-gray-600">
              Integrity, innovation, excellence, and client success are at the heart of everything we do.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 rounded-lg p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-800 mb-2">500+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-800 mb-2">200+</div>
              <div className="text-gray-300">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-800 mb-2">50+</div>
              <div className="text-gray-300">Team Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-800 mb-2">10+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

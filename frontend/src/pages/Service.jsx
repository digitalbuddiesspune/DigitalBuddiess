import React from 'react'

function Service() {
  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies and best practices.',
      icon: '🌐'
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: '📱'
    },
    {
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence.',
      icon: '📈'
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience.',
      icon: '🎨'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services.',
      icon: '☁️'
    },
    {
      title: 'Consulting',
      description: 'Expert advice to help you make informed digital transformation decisions.',
      icon: '💼'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of digital services to help your business succeed
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-orange-800"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
              <button className="mt-6 text-orange-800 font-semibold hover:text-orange-900 transition-colors duration-300">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gray-900 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Let's discuss how we can help transform your business
          </p>
          <button className="bg-orange-800 hover:bg-orange-900 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  )
}

export default Service

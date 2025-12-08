import React, { useState } from 'react';

// NOTE: Add this <style> block to your component or ensure these animations 
// are defined in your global CSS for the smooth effects to work.
const AnimatedStyles = () => (
  <style>
    {`
      @keyframes slideInUp {
        0% { transform: translateY(50px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      .animate-slideInUp {
        animation: slideInUp 0.7s ease-out forwards;
      }

      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.8s ease-out forwards;
      }
    `}
  </style>
);


function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server API endpoint
    console.log('Form submitted:', formData);
    alert('Thank you! Your query has been received.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  // --- Your Contact Information ---
  // Three cards: Contact, Mail, Address
  const contactInfo = [
    { 
      title: 'Contact Us', 
      detail: '+91 9766670916', 
      icon: 'phone',
      bgColor: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700'
    }, 
    { 
      title: 'Mail Us', 
      detail: 'info@digitalbuddiess.in', 
      icon: 'mail',
      bgColor: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700'
    },
    { 
      title: 'Address', 
      detail: '618 , Gera’s , Imperum Rise, Wipro Circle , Hinjewadi, Pune Pincode : 411057.', 
      icon: 'location',
      bgColor: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700'
    },
  ];
  
  // Placeholder for the background image URL (Update this with your actual URL)
  const backgroundImageURL = 'https://res.cloudinary.com/duc9svg7w/image/upload/v1764917209/8cf56845-5518-49fe-945a-90e41c0df28f.png'; 
  const mapEmbedURL = 'https://www.google.com/maps?q=618+Gera%27s+Imperum+Rise+Wipro+Circle+Hinjewadi+Pune+411057&output=embed';

  const renderIcon = (type) => {
    if (type === 'phone') {
      return (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.12 3.358a1 1 0 01-.502 1.21l-1.9.95a11.042 11.042 0 005.516 5.516l.95-1.9a1 1 0 011.21-.502l3.358 1.12a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    }
    if (type === 'mail') {
      return (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  };

  return (
    <>
      <AnimatedStyles />
      <div className="min-h-screen bg-gray-50">
        
        {/* === HEADER SECTION: Dark Background & Text === */}
        <div 
          className="relative bg-gray-900 bg-cover bg-center min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden"
          style={{ 
            backgroundImage: `url('${backgroundImageURL}')`, 
          }}
        >
          {/* Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-black opacity-60"></div> 
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-white w-full">
            
            {/* Text Content - Centered */}
            <div className={`max-w-3xl mx-auto text-center z-10 animate-fadeIn`} style={{ animationDelay: '0.2s' }}>
              {/* Tag/Badge */}
              <div className="inline-block px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-wider text-white bg-orange-600 rounded-full">
                24/7 Support Solution
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Queries Are Important: <br />Connect with Us Anytime
              </h1>
              
              {/* Subtext */}
              <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Your thoughts and concerns are important to us. If you have any questions, suggestions, 
                or feedback, please reach out. Our friendly support team is ready to assist you and 
                ensure you have a great experience.
              </p>
            </div>
          </div>
        </div>

        {/* === MAIN CONTENT CONTAINER: Cards & Form === */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          
          {/* --- Contact Cards Section (4 Columns) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {contactInfo.map((item, index) => (
              <div 
                key={index} 
                className={`p-6 text-white rounded-lg shadow-xl transform transition-transform duration-300 ${item.bgColor} ${item.hoverColor} hover:scale-[1.02] flex flex-col items-start animate-slideInUp`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }} // Staggered delay
              >
                {/* Icon (large) */}
                <div className="text-3xl mb-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-600">
                    {renderIcon(item.icon)}
                </div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-sm opacity-90">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* --- Form Section: White Card (Map Placeholder on Left, Form on Right) --- */}
          <div className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column: Placeholder for the Map/Visual */}
            <div className="hidden lg:block relative min-h-[400px] rounded-lg overflow-hidden">
              <iframe
                title="Office Location"
                src={mapEmbedURL}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Right Column: Contact Form */}
            <div className="w-full">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">READY TO GROW YOUR BUSINESS?</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name and Email (or Phone) - Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                      placeholder="Email"
                    />
                  </div>
                </div>

                {/* Phone Number - Row 2 (Added to match common form fields, adjust if needed) */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Phone Number"
                  />
                </div>
                
                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 bg-gray-100 resize-none"
                    placeholder="Message"
                  ></textarea>
                </div>

                {/* Submit Button (Bright Orange style) */}
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-xl"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-2 text-2xl">🔥</span> GET A FREE QUOTE
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
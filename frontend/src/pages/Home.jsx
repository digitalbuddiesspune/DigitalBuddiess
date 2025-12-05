import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, BarChart, Smartphone, Zap, Globe, MessageCircle, Plus, Minus } from 'lucide-react';

// Social Media Icons as SVG Components
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

/* --- COMPONENTS --- */

// 1. Loading Screen
const Preloader = ({ setLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: -50, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-light tracking-wider"
      >
        Welcome to <span className="font-bold text-orange-500">digital buddies</span>
      </motion.h1>
      
      {/* Loading Bar */}
      <motion.div 
        className="mt-8 h-1 bg-gray-800 rounded-full w-48 overflow-hidden"
      >
        <motion.div 
          className="h-full bg-orange-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          onAnimationComplete={() => setLoading(false)}
        />
      </motion.div>
    </motion.div>
  );
};

// 2. 3D Floating Shape (Abstract representation of your image's shapes)
const FloatingShape = ({ delay, className }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
    className={`absolute hidden md:block opacity-90 ${className}`}
  >
    {/* Using a gradient div to mimic the 3D orange blobs */}
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-300 to-orange-600 shadow-lg blur-sm" />
  </motion.div>
);

// 3. Accordion Section for Services
const ServicesAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const services = [
    {
      title: "Digital Marketing Services",
      description: "Elevate your online presence with tailored digital marketing strategies",
      content: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click Advertising (PPC)",
        "Social Media Marketing",
        "Email Marketing Campaigns",
        "Content Marketing",
        "Analytics & Reporting"
      ]
    },
    {
      title: "Creative Services",
      description: "Bringing your brand to life with innovative and captivating visuals.",
      content: [
        "Graphic Design",
        "Logo & Brand Identity",
        "Print Design",
        "Illustration",
        "Photography",
        "Video Production"
      ]
    },
    {
      title: "Web & App Development",
      description: "Building responsive websites and apps that drive engagement and growth.",
      content: [
        "Custom Website Development",
        "Mobile App Development",
        "E-commerce Solutions",
        "Web Application Development",
        "API Integration",
        "Maintenance & Support"
      ]
    },
    {
      title: "Advertising Services",
      description: "Maximize your reach with data-driven advertising campaigns",
      content: [
        "Google Ads Management",
        "Social Media Advertising",
        "Display Advertising",
        "Video Advertising",
        "Retargeting Campaigns",
        "Campaign Optimization"
      ]
    },
    {
      title: "Branding Services",
      description: "Crafting unique brand identities that stand out in the market.",
      content: [
        "Brand Strategy",
        "Logo Design",
        "Brand Guidelines",
        "Visual Identity Systems",
        "Rebranding Services",
        "Brand Positioning"
      ]
    },
    {
      title: "Additional Services",
      description: "Comprehensive solutions to meet all your digital needs.",
      content: [
        "Consulting Services",
        "Digital Strategy",
        "Market Research",
        "Competitor Analysis",
        "Technical Support",
        "Training & Workshops"
      ]
    },
    {
      title: "Ecommerce Marketing",
      description: "Boost your online store's sales with proven ecommerce marketing tactics.",
      content: [
        "E-commerce Strategy",
        "Product Listing Optimization",
        "Shopping Campaigns",
        "Conversion Rate Optimization",
        "Abandoned Cart Recovery",
        "Marketplace Management"
      ]
    },
    {
      title: "Lead Generation",
      description: "Driving qualified leads to fuel your business growth.",
      content: [
        "Lead Generation Strategy",
        "Landing Page Optimization",
        "Lead Nurturing Campaigns",
        "CRM Integration",
        "Lead Qualification",
        "Conversion Tracking"
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Offer</h2>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-orange-500 rounded-lg overflow-hidden shadow-lg"
              initial={false}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-orange-600 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-800 font-normal">
                    {service.description}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <AnimatePresence mode="wait">
                    {openIndex === index ? (
                      <motion.div
                        key="minus"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Minus size={32} className="text-gray-900" strokeWidth={3.5} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="plus"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Plus size={32} className="text-gray-900" strokeWidth={3.5} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>

              <div className="px-8 pb-2">
                <div className="h-px bg-gray-900/20"></div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-white"
                  >
                    <div className="px-8 pb-6 pt-4">
                      <ul className="space-y-3">
                        {service.content.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: itemIndex * 0.05 }}
                            className="text-gray-900 text-sm md:text-base flex items-center font-medium"
                          >
                            <span className="w-2 h-2 bg-gray-900 rounded-full mr-3"></span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. Contact Us Section with Floating Social Icons
const ContactUsSection = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact-us');
  };

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Floating Social Media Icons */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
        className="absolute left-10 top-1/4 hidden md:block"
      >
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <InstagramIcon className="w-10 h-10 text-pink-600" />
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute right-20 top-1/3 hidden md:block"
      >
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <FacebookIcon className="w-10 h-10 text-blue-600" />
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute left-1/4 bottom-1/4 hidden md:block"
      >
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <YoutubeIcon className="w-10 h-10 text-red-600" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Main Heading - DIGITAL */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-9xl font-bold mb-6"
          style={{
            color: '#ea580c',
            textShadow: '4px 4px 0px rgba(234, 88, 12, 0.3), 8px 8px 0px rgba(234, 88, 12, 0.2)',
            letterSpacing: '0.05em'
          }}
        >
          DIGITAL
        </motion.h2>

        {/* Subheading - BUDDIES */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl text-white mb-12 font-semibold tracking-wider"
        >
          BUDDIES
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleContactClick}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-2xl transition-all duration-300"
          style={{
            boxShadow: '0 10px 30px rgba(234, 88, 12, 0.4)'
          }}
        >
          Contact Us
        </motion.button>
      </div>
    </section>
  );
};

export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-gray-900 font-sans selection:bg-orange-200">
      <AnimatePresence>
        {loading && <Preloader setLoading={setLoading} />}
      </AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* --- HERO SECTION (Based on your Image) --- */}
          <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 max-w-5xl mx-auto">
            {/* Abstract Floating Shapes imitating the image */}
            <FloatingShape delay={0} className="top-20 left-10 scale-125" />
            <FloatingShape delay={1.5} className="bottom-20 right-20 scale-75" />
            <FloatingShape delay={0.5} className="top-40 right-10 scale-90" />
            <FloatingShape delay={2} className="bottom-40 left-20 scale-110" />

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-semibold leading-tight mb-6 z-10"
            >
              We offer the best digital solutions<br />
              for <span className="font-serif italic font-light">your business.</span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 max-w-2xl text-lg md:text-xl leading-relaxed mb-10 z-10"
            >
              Whether you're a startup or an established business, we help you connect with your audience, boost engagement, and grow online—smarter and faster.
            </motion.p>

            <motion.button 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 bg-black text-white pl-8 pr-2 py-2 rounded-full text-lg shadow-xl z-10 group"
            >
              Get Started Now
              <div className="bg-white text-black rounded-full p-2 group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight size={20} />
              </div>
            </motion.button>
          </section>

          {/* --- SERVICES ACCORDION SECTION --- */}
          <ServicesAccordion />

          {/* --- CONTACT US SECTION --- */}
          <ContactUsSection />

          {/* --- NEW SECTION: SERVICES --- */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12 text-center md:text-left">
                <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">Our Expertise</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">Everything you need to grow.</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <Globe size={32} />, title: "Web Development", desc: "Lightning fast websites built with modern technologies like React and Next.js." },
                  { icon: <Smartphone size={32} />, title: "App Design", desc: "Intuitive mobile experiences for iOS and Android that users fall in love with." },
                  { icon: <BarChart size={32} />, title: "Digital Marketing", desc: "Data-driven strategies to increase your ROI and market presence." },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -10 }}
                    className="p-8 bg-gray-50 rounded-3xl hover:bg-orange-50 transition-colors cursor-pointer group"
                  >
                    <div className="bg-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm mb-6 text-gray-800 group-hover:text-orange-500 transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- NEW SECTION: WHY CHOOSE US --- */}
          <section className="py-20 bg-black text-white overflow-hidden relative">
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Smarter solutions for <br /><span className="text-orange-500">modern problems.</span></h2>
                <p className="text-gray-400 text-lg mb-8">
                  We don't just build software; we build partnerships. Our agile approach ensures that we adapt to your needs instantly.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    "24/7 Dedicated Support",
                    "Scalable Cloud Architecture",
                    "User-Centric Design Philosophy"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-orange-500 rounded-full p-1"><Zap size={14} className="text-black" /></div>
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4 translate-y-8">
                      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                        <Code className="text-orange-500 mb-2" />
                        <div className="font-bold text-2xl">150+</div>
                        <div className="text-sm text-gray-500">Projects Done</div>
                      </div>
                      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                        <MessageCircle className="text-blue-400 mb-2" />
                        <div className="font-bold text-lg">Instant Comms</div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 h-32"></div>
                      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                         <div className="font-bold text-2xl">98%</div>
                         <div className="text-sm text-gray-500">Client Satisfaction</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </section>
        </motion.main>
      )}
    </div>
  );
}